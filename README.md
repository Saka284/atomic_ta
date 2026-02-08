# Atomic Web TA

[![Laravel Tests](https://github.com/DhimasArdinata/atomic-web-ta/actions/workflows/ci.yml/badge.svg)](https://github.com/DhimasArdinata/atomic-web-ta/actions/workflows/ci.yml)

Atomic Web TA adalah aplikasi web berbasis Laravel yang dirancang untuk memantau dan mengontrol sistem Greenhouse IoT. Aplikasi ini menyediakan API untuk berinteraksi dengan perangkat mikrokontroler (ESP32/ESP8266) dan antarmuka web untuk pengguna.

## Fitur Utama

*   **Pemantauan Real-time**: Menampilkan data suhu, kelembaban, dan visualisasi dari sensor.
*   **Kontrol Aktuator**: Mengelola perangkat seperti blower, exhaust, dan dehumidifier.
*   **Penjadwalan Otomatis**: Mengatur jadwal operasi perangkat.
*   **Kamera Terintegrasi**: Upload dan monitoring gambar dari kamera IoT.
*   **OTA Firmware**: Manajemen pembaruan firmware mikrokontroler secara nirkabel (Over-the-Air).

## Cakupan API (API Coverage)

Sistem ini telah dilengkapi dengan pengujian otomatis (CI/CD) untuk memastikan keandalan API, terutama yang berhubungan dengan perangkat eksternal.

Berikut adalah daftar API yang telah tercover oleh test automation:

### 1. Sensor API
*   `POST /api/sensor`: Menerima data telemetri (suhu, kelembaban, dll) dari node sensor.
    *   **Status Test**: ✅ Tercover (Memastikan data tersimpan di database).

### 2. Camera API
*   `POST /api/camera`: Menerima upload gambar dari modul kamera ESP32-CAM.
    *   **Status Test**: ✅ Tercover (Memastikan file gambar diterima dan disimpan).

### 3. OTA (Firmware) API
*   `GET /api/get-file/{nodeId}`: Endpoint bagi mikrokontroler untuk mengecek update firmware terbaru.
    *   **Status Test**: ✅ Tercover (Memastikan respon info firmware valid).

### 4. Schedule API
*   `POST /api/schedules`: Menyimpan konfigurasi jadwal dari Web.
    *   **Status Test**: ✅ Tercover (Memastikan setting jadwal tersimpan).
*   `POST /api/gateway/schedule`: Endpoint bagi Gateway untuk mengambil jadwal aktif.
    *   **Status Test**: ✅ Tercover (Memastikan format binary relay/jadwal sesuai spek mikrokontroler).

## Status Build & Quality

Proyek ini menggunakan GitHub Actions untuk Continuous Integration (CI).
Setiap push atau pull request ke branch apapun akan otomatis menjalankan:

1.  **Security Audit**: Mengecek celah keamanan pada dependencies (`composer audit`).
2.  **Unit & Feature Tests**: Menjalankan test suite PHPUnit (`php artisan test`).
3.  **Asset Build**: Memastikan aset frontend (Vue.js/Tailwind) berhasil di-compile (`npm run build`).
4.  **Artifact Upload**: Jika test gagal, log server akan otomatis di-upload untuk debugging.

Jika badge di atas berwarna **Hijau (Passing)**, berarti seluruh kode aman dan siap digunakan.

## Cara Instalasi Lokal

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/DhimasArdinata/atomic-web-ta.git
    cd atomic-web-ta
    ```

2.  **Install Dependencies**
    ```bash
    composer install
    npm install
    ```

3.  **Konfigurasi Environment**
    Copy file `.env.example` menjadi `.env` dan atur database.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Setup Database**
    ```bash
    # Buat database MySQL
    mysql -u root -p -e "CREATE DATABASE atomic_web_local"
    
    # Import struktur dan data (jika ada backup)
    mysql -u root -p atomic_web_local < sql/atomic_backup-01-structure.sql
    
    # Import data (opsional - jika ada file backup)
    Get-ChildItem sql\atomic_backup-*-data.sql | ForEach-Object { mysql -u root -p atomic_web_local -e "source $_" }
    
    # Atau jalankan migration jika fresh install
    php artisan migrate
    
    # Populate sensor_snapshots table (WAJIB untuk monitoring page)
    php artisan db:seed --class=SensorSnapshotSeeder
    ```

5.  **Jalankan Server**
    ```bash
    php artisan serve
    npm run watch
    ```

## Lisensi

Aplikasi ini bersifat open-source di bawah lisensi [MIT](https://opensource.org/licenses/MIT).
