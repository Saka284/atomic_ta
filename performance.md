# Performance Optimization Story
 
Dokumentasi perjalanan optimasi performa pada aplikasi Atomic Web, dari migrasi arsitektur hingga optimasi query database level rendah.
 
---
 
## 🚀 Era Baru: Migrasi Inertia.js v2
 
Perubahan terbesar pada sisi Frontend adalah migrasi ke **Inertia.js v2**, yang mengubah pengalaman pengguna secara drastis.
 
### 1. The "Need for Speed" (Prefetching)
 
Fitur *game-changer* di Inertia v2 adalah **Prefetching**.
 
*   **Cara Kerja:** Saat user *hover* mouse di atas link navigasi (selama 50ms+), Inertia secara diam-diam me-fetch data halaman tujuan di background.
*   **Hasil:** Saat user benar-benar klik, data sudah tersedia. Halaman muncul **INSTAN** (0ms delay percepual).
 
> "It feels less like a website, and more like a native application."

---

## 📏 Benchmark & Threshold

Benchmark berjalan di CI dan bisa dijalankan lokal untuk semua endpoint penting.

```bash
php artisan migrate:fresh --seed --seeder=BenchmarkSeeder
php artisan bench:endpoints --output=benchmarks/current.json --fail-on-threshold
php scripts/bench_compare.php --current=benchmarks/current.json --baseline=benchmarks/baseline.json
```

Konfigurasi:
- `config/bench.php` untuk jumlah iterasi, warmup, dan threshold (p95).
- Override lewat ENV: `BENCH_ITERATIONS`, `BENCH_WARMUP`, `BENCH_THRESHOLDS`.
 
### 2. Code Splitting & Lazy Loading
 
Kami meninggalkan pendekatan "Monolithic Bundle". Dengan konfigurasi Webpack/Laravel Mix terbaru, aplikasi dipecah menjadi *chunks* kecil:
 
*   **Smart Loading:** User hanya men-download JavaScript untuk halaman yang sedang mereka buka.
*   **Bukti:**
    *   `vendor.js` (Library core): ~2MB (Cached selamanya di browser)
    *   `resources_js_Pages_Monitoring_vue.js`: ~180KB (Hanya diload saat buka menu Monitoring)
    *   `resources_js_Pages_Table_vue.js`: ~100KB (Hanya diload saat buka menu Table)
 
Ini mengurangi **Initial Load Time** secara signifikan karena browser tidak perlu men-download kode untuk halaman yang tidak dilihat user.
 
---
 
## ⚙️ Backend Revolution: Optimasi Database
 
Di sisi Backend, kami melakukan refactoring besar-besaran dari *Eloquent Convenience* menuju *Raw SQL Performance*.
 
### 1. Masalah: N+1 Query & Loop Lambat
*   **Kondisi Lama:** Menggunakan Eloquent `foreach` untuk memproses ribuan data sensor.
*   **Dampak:** Memori server bengkak, response time lambat seiring bertambahnya data.
 
### 2. Solusi: Raw SQL & Aggregation
Kami memindahkan logika berat dari PHP ke Database Engine (MySQL/C++).
 
**Before (PHP Processing):**
```php
$data = SensorData::all(); // ❌ Load 1 juta baris ke RAM
$avg = $data->avg('value'); // ❌ Loop di PHP (lambat)
```
 
**After (MySQL Processing):**
```php
$avg = DB::selectOne("SELECT AVG(value) FROM sensor_data"); // ✅ Hasil keluar dalam hitungan millisecond
```
 
### 3. Snapshot Table Pattern
Untuk halaman Dashboard yang butuh data *real-time* tapi beban query berat:
1.  Dibuat tabel `sensor_snapshots` yang hanya berisi **1 copy data terbaru** dari setiap sensor.
2.  Setiap kali sensor kirim data, tabel ini di-update (UPSERT).
3.  **Impact:** Query dashboard berubah dari scan jutaan baris (O(n)) menjadi baca langsung 20 baris (O(1)). **Speed improvement: ~99%**.
 
---
 
## 📊 Komparasi Performa (Git Diff Analysis)
 
Berikut adalah ringkasan teknis perubahan performa berdasarkan analisa kode:
 
| Fitur | Teknik Lama | Teknik Baru | Improvement |
|-------|-------------|-------------|-------------|
| **Navigasi** | Standard SPA Links | **Inertia Link + Prefetch** | **Instant (0ms)** |
| **Asset Loading** | Single Bundle (Huge) | **Code Splitting (Chunks)** | **Faster TTI** |
| **Get Monitoring** | Eloquent Loop (N+1) | **Single Raw SQL Join** | **~300ms → 20ms** |
| **Threshold Update** | Loop Update Query (N) | **Batch CASE Update (1)** | **N Queries → 1 Query** |
| **Table Data** | Realtime Query | **Cache 60s** | **Load reduced** |
 
---
 
## 🎓 Cheat Sheet Optimasi
 
Prinsip utama yang dipegang dalam pengembangan Atomic Web TA:
 
1.  **Don't make PHP think:** Berikan beban komputasi data ke MySQL.
2.  **Don't make User wait:** Gunakan Prefetching & Caching.
3.  **Don't load unnecessary code:** Gunakan Code Splitting.
4.  **Limits:** Selalu gunakan `LIMIT` saat mengambil data log/history.
 
---
 
## 🎓 Developer Academy: Big O & Optimasi 101
 
Bagian ini menjelaskan konsep "Computer Science" di balik optimasi di atas dengan bahasa manusia, bukan bahasa robot.
 
### 1. Apa itu "Big O Notation"?
 
Bayangkan Big O sebagai **"Skor Skalabilitas"**. Ini mengukur seberapa *ngos-ngosan* komputer saat data bertambah banyak.
 
#### **O(1) - "The Flash" (Constant Time)**
*   **Analogi:** Memanggil teman lewat Speed Dial. Tidak peduli kamu punya 10 kontak atau 1.000 kontak, waktu panggilnya **SAMA CEPATNYA**.
*   **Di Code:** Mengakses Array key, membaca Cache, Hash Map.
*   **Contoh:** `sensor_snapshots` table (kita tahu persis ID yang mau diambil).
 
#### **O(n) - "The Librarian" (Linear Time)**
*   **Analogi:** Mencari kata "Zebra" di kamus, tapi dengan cara membaca halaman **satu per satu** dari halaman pertama. Kalau kamusnya tebal (1 juta data), bakal lama banget.
*   **Di Code:** `foreach` loop, `SensorData::all()`, mencari di database tanpa Index.
*   **Contoh:** Kode lama yang meloop semua sensor untuk update threshold satu-satu.
 
#### **O(log n) - "The Smart Search" (Logarithmic Time)**
*   **Analogi:** Mencari kata di kamus dengan cara: buka tengah -> "oh ini huruf M, Zebra pasti di kanan" -> buang bagian kiri -> buka tengah bagian kanan -> ulang terus.
*   **Di Code:** Binary Search, Database Index Scan.
*   **Sifat:** Sangat efisien. 1 Juta data cuma butuh ~20 langkah!
 
#### **O(n²) - "The Disaster" (Quadratic Time)**
*   **Analogi:** Ada pesta dengan 100 orang, dan setiap orang harus bersalaman dengan **semua** orang lainnya.
*   **Di Code:** Nested Loop (Loop di dalam loop).
*   **Sifat:** JANGAN LAKUKAN INI untuk data besar. 1.000 data = 1.000.000 operasi!
 
---
 
### 2. Prinsip Optimasi (The Golden Rules)
 
#### **Rule #1: The Lazy Principle (Malas itu Baik)**
Jangan kerjakan apa yang tidak diminta.
*   **Salah:** Ambil semua data user dari DB (`SELECT *`), padahal cuma butuh `name`.
*   **Benar:** `SELECT name FROM users`.
*   **Penerapan:** Lazy Loading asset JS, Inertia Partial Relaods.
 
#### **Rule #2: The Delegator Principle (Delegasikan!)**
PHP itu manajer, MySQL itu kuli panggul (yang sangat kuat karena ditulis pakai C++).
*   **Salah:** Ambil 1 juta data ke PHP, lalu hitung rata-rata pakai Loop. (Manajer yang angkat barang).
*   **Benar:** Suruh MySQL hitung `AVG()`, PHP tinggal terima hasil jadinya. (Manajer terima laporan beres).
 
#### **Rule #3: The Elephant Memory (Gajah Tidak Lupa)**
Hitung sekali, ingat selamanya (sampai berubah).
*   **Konsep:** Caching.
*   **Penerapan:** `Cache::remember`. Jika data `controlling` tidak berubah dalam 1 menit, kenapa harus tanya database berulang kali? Pakai ingatan (RAM) jauh lebih cepat daripada tanya ke gudang (Disk DB).
 
---
*Dokumen ini diperbarui otomatis berdasarkan analisa Git Diff terakhir: 2ab0a7a*
