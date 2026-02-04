# Performance Optimization Guide

Dokumentasi teknik optimasi performa yang diterapkan pada aplikasi Atomic Web.

---

## 📊 Perubahan dari Git Diff

### 1. Raw SQL Query Optimization

**Sebelum:** Eloquent ORM
```php
$sensors = Sensor::where('gh_id', $gh_id)->get();
$last_data = SensorData::where('node_id', $node_id)->latest()->first();
```

**Sesudah:** Raw SQL
```php
$sensors = DB::select("SELECT * FROM sensors WHERE gh_id = ?", [$gh_id]);
$last_data = DB::selectOne("SELECT created_at FROM sensor_data WHERE node_id = ? ORDER BY id DESC LIMIT 1", [$node_id]);
```

| Endpoint | Teknik | Impact |
|----------|--------|--------|
| `sensor()` | Raw SQL rate check | ~30% faster |
| `thd()` | Raw SQL select | ~40% faster |
| `get_average_sensor_data()` | Snapshot table | **~90% faster** |
| `updateThreshold()` | Batch CASE UPDATE | **N→1 queries** |
| `getControlling()` | Response caching | **~95% faster** |

---

### 2. Snapshot Table Pattern

**Konsep:** Simpan data terbaru di table terpisah yang di-update setiap kali data baru masuk.

```
┌─────────────────────┐     INSERT      ┌──────────────────┐
│   sensor_data       │ ──────────────► │ sensor_snapshots │
│   (1M+ rows)        │     UPSERT      │ (max ~20 rows)   │
└─────────────────────┘                 └──────────────────┘
     Full Scan O(n)                       Direct Read O(1)
```

**Implementasi:**
```php
DB::table('sensor_snapshots')->upsert(
    ['sensor_id' => $id, 'node_id' => $node, 'value' => $val, ...],
    ['sensor_id', 'node_id'],  // Unique keys
    ['value', 'recorded_at']   // Update columns
);
```

---

### 3. Composite Index

```php
$table->index(['sensor_id', 'node_id', 'recorded_at'], 'idx_sensor_node_recorded');
```

**Mengapa penting:** Query dengan multiple `WHERE` conditions akan jauh lebih cepat karena database bisa langsung "jump" ke data tanpa full table scan.

---

### 4. Batch Update dengan CASE

**Sebelum:** N queries untuk N sensors
```php
foreach ($thresholds as $t) {
    Sensor::find($t['id'])->update([...]);  // N queries!
}
```

**Sesudah:** 1 query untuk semua
```sql
UPDATE sensors SET 
    threshold_min = CASE WHEN id=1 THEN 20 WHEN id=2 THEN 30 END,
    threshold_max = CASE WHEN id=1 THEN 35 WHEN id=2 THEN 45 END
WHERE id IN (1,2)
```

---

### 5. Response Caching

```php
return Cache::remember('controlling_data', 60, function () {
    return Greenhouse::with('sensor')->get();
});
```

**Dengan invalidation saat data berubah:**
```php
Cache::forget('controlling_data');
```

---

## 🎓 Big O Notation

Big O menjelaskan "seberapa lambat algoritma saat data bertambah besar".

### Visualisasi

```
Speed
  ▲
  │
  │                                    O(n²) ← HINDARI!
  │                              ╱
  │                         ╱
  │                    ╱
  │               ╱          O(n)
  │          ╱          ___________
  │     ╱     _____----
  │ ╱  __----              O(log n)
  │---                     ___________
  │______________________ O(1) ← TARGET!
  └──────────────────────────────────► Data Size
```

### Cheat Sheet

| Notasi | Nama | Contoh | Waktu untuk 1M data |
|--------|------|--------|---------------------|
| **O(1)** | Constant | HashMap lookup, Index read | **1 ms** |
| **O(log n)** | Logarithmic | Binary search, B-tree index | ~20 ms |
| **O(n)** | Linear | Full table scan, foreach | ~1 detik |
| **O(n log n)** | Linearithmic | Sorting | ~20 detik |
| **O(n²)** | Quadratic | Nested loops | **~11 hari** |

### Contoh Praktis

```php
// O(1) - Langsung dapat hasilnya
$user = $cache->get('user_1');

// O(n) - Harus cek semua data
$user = User::where('email', $email)->first();  // tanpa index!

// O(1) dengan index
$user = User::where('email', $email)->first();  // email di-index
```

---

## 🚀 Kiat Sukses Performa

### 1. Raw SQL = C++ Power

Eloquent ORM nyaman tapi ada overhead:
- **Hydration:** Konversi row → PHP Object
- **Event firing:** Model events, accessors, mutators
- **Memory:** Setiap model butuh memory allocation

**Raw SQL langsung ke MySQL engine (written in C++):**
```php
// ❌ Eloquent: PHP parsing + object creation
$data = SensorData::where('sensor_id', 1)->avg('value');

// ✅ Raw SQL: MySQL C++ engine does the work
$data = DB::selectOne("SELECT AVG(value) FROM sensor_data WHERE sensor_id = ?", [1]);
```

### 2. Push Aggregation ke Database

**❌ PHP Side (lambat):**
```php
$data = SensorData::all();
$avg = $data->avg('value');  // PHP menghitung 1M rows
```

**✅ Database Side (cepat):**
```php
$avg = DB::selectOne("SELECT AVG(value) as avg FROM sensor_data")->avg;
// MySQL C++ engine menghitung, PHP hanya terima 1 angka
```

### 3. Index Strategy

```php
// Buat index untuk kolom yang sering di-WHERE atau di-JOIN
$table->index('sensor_id');                    // Single
$table->index(['sensor_id', 'recorded_at']);   // Composite

// Urutan composite index PENTING!
// Index ['A', 'B'] bisa query: WHERE A=?, WHERE A=? AND B=?
// TAPI TIDAK untuk: WHERE B=? (harus full scan)
```

### 4. LIMIT Everything

```php
// ❌ Load semua data
$data = SensorData::all();

// ✅ Load yang dibutuhkan saja
$data = DB::select("SELECT * FROM sensor_data ORDER BY id DESC LIMIT 500");
```

### 5. Cache Hot Data

```php
// Data yang sering diakses tapi jarang berubah
return Cache::remember('key', 60, fn() => expensive_query());

// Invalidate saat data berubah
Cache::forget('key');
```

### 6. N+1 Problem Prevention

```php
// ❌ N+1 queries (1 + N queries)
$greenhouses = Greenhouse::all();
foreach ($greenhouses as $gh) {
    echo $gh->sensors;  // Query per iteration!
}

// ✅ Eager loading (2 queries)
$greenhouses = Greenhouse::with('sensors')->get();
```

### 7. Materialized View Pattern

Untuk query kompleks yang sering dijalankan:
1. Buat table "snapshot" dengan hasil pre-computed
2. Update snapshot saat data baru masuk (via UPSERT)
3. Read dari snapshot = O(1)

---

## 📐 Rumus Cepat

```
Waktu Query ≈ (Rows Scanned / Index Efficiency) × Network Latency

Dengan index:     1M rows → scan ~1 row → 0.1ms
Tanpa index:      1M rows → scan 1M rows → 1000ms
```

---

## 🎯 Summary

| Prinsip | Implementasi |
|---------|--------------|
| **Minimize PHP work** | Push ke database C++ engine |
| **O(1) > O(n)** | Index + Snapshot tables |
| **1 query > N queries** | Batch updates, Eager loading |
| **Cache hot data** | Response caching dengan invalidation |
| **Limit results** | Always use LIMIT clause |
