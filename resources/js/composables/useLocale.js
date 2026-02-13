import { ref } from "vue";

const STORAGE_KEY = "app_locale";
const DEFAULT_LOCALE = "id";
const SUPPORTED_LOCALES = ["id", "en"];

const messages = {
    id: {
        "layout.brand_console": "Konsol Greenhouse",
        "layout.navigation": "Navigasi",
        "layout.system_status": "Status Sistem",
        "layout.dashboard_ready": "Dashboard online dan siap",
        "layout.header_subtitle": "Pusat operasi greenhouse atomic",
        "layout.close_sidebar": "Tutup sidebar",
        "layout.toggle_navigation": "Tampilkan navigasi",
        "layout.logout": "Keluar",
        "layout.language": "Bahasa",
        "layout.lang_id": "Indonesia",
        "layout.lang_en": "Inggris",
        "nav.monitoring": "Monitor",
        "nav.monitoring_desc": "Ringkasan sensor langsung",
        "nav.heatmap": "Peta Iklim",
        "nav.heatmap_desc": "Peta kondisi area",
        "nav.table": "Tabel",
        "nav.table_desc": "Riwayat data sensor",
        "nav.camera": "Kamera",
        "nav.camera_desc": "Linimasa gambar kabut",
        "nav.controlling": "Kontrol",
        "nav.controlling_desc": "Ambang dan jadwal",
        "title.monitoring": "Monitor",
        "title.heatmap": "Peta Iklim",
        "title.table": "Tabel",
        "title.camera": "Kamera",
        "title.controlling": "Kontrol",
        "common.all": "Semua",
        "common.of": "dari",
        "common.to": "sampai",
        "common.no_data": "Tidak ada data",
        "common.unexpected_error": "Ups! Terjadi kesalahan.",
        "sensor.temperature": "Suhu",
        "sensor.humidity": "Kelembapan",
        "sensor.light_intensity": "Intensitas Cahaya",
        "monitoring.time": "Waktu",
        "monitoring.latest_data": "Data Terbaru",
        "monitoring.status": "Status",
        "monitoring.exhaust_fan": "Kipas Buang",
        "monitoring.dehumidifier": "Dehumidifier",
        "monitoring.blower": "Kipas Sirkulasi",
        "monitoring.camera": "Kamera",
        "monitoring.on": "NYALA",
        "monitoring.off": "MATI",
        "monitoring.average": "Rata-rata",
        "monitoring.per_node": "Per Node",
        "monitoring.range_custom": "Kustom",
        "monitoring.range_1h": "1 Jam",
        "monitoring.range_1d": "1 Hari",
        "monitoring.range_1w": "1 Minggu",
        "monitoring.range_1m": "1 Bulan",
        "monitoring.date": "Tanggal",
        "monitoring.hour": "Jam",
        "monitoring.loading_chart": "Memuat grafik...",
        "monitoring.no_data": "Data tidak tersedia.",
        "monitoring.loading_gauge": "Memuat gauge...",
        "monitoring.failed_load_chart": "Gagal memuat grafik.",
        "monitoring.failed_load_data": "Gagal memuat data.",
        "camera.date_time": "Tanggal Waktu",
        "camera.fog_accuracy": "Akurasi Kabut",
        "camera.status": "Status",
        "camera.time": "Waktu",
        "camera.latest_data": "Data Terbaru",
        "camera.export": "Ekspor",
        "camera.all": "Semua",
        "camera.show": "Tampil",
        "camera.per_page": "per halaman",
        "camera.showing": "Menampilkan",
        "camera.page_no_data": "Tidak ada data",
        "camera.pick_date_range": "Pilih rentang tanggal",
        "camera.status_foggy": "Berkabut",
        "camera.status_clear": "Tidak Berkabut",
        "camera.status_unknown": "Tidak Diketahui",
        "camera.accuracy": "Akurasi",
        "camera.failed_load_data": "Gagal memuat data.",
        "camera.date_range_required": "Rentang tanggal wajib diisi.",
        "camera.zip_downloaded": "File ZIP berhasil diunduh.",
        "camera.no_data_selected_range":
            "Tidak ada data pada rentang tanggal tersebut.",
        "camera.failed_download": "Gagal mengunduh file.",
        "table.failed_load_data": "Gagal memuat data.",
        "table.date_range_required": "Rentang tanggal wajib diisi.",
        "table.excel_downloaded": "File Excel berhasil diunduh.",
        "table.failed_download": "Gagal mengunduh file.",
        "table.no": "No",
        "table.node": "Node",
        "table.date": "Tanggal",
        "table.time": "Waktu",
        "table.temperature": "Suhu (°C)",
        "table.humidity": "Kelembapan (%)",
        "table.light_intensity": "Intensitas Cahaya (lx)",
        "table.rssi": "RSSI (dBm)",
        "table.monitoring_data": "Data Monitoring",
        "table.filter_by_date": "Filter Tanggal",
        "table.all_nodes": "Semua Node",
        "table.export": "Ekspor",
        "table.export_current_view": "Ekspor tampilan saat ini ke Excel",
        "table.loading_data": "Memuat data...",
        "controlling.threshold_tab": "Ambang Batas",
        "controlling.scheduling_tab": "Penjadwalan",
        "controlling.min": "Min",
        "controlling.max": "Maks",
        "controlling.save_thresholds": "Simpan Ambang Batas",
        "controlling.scheduling_mode": "Mode Penjadwalan",
        "controlling.rule_threshold_desc":
            "Aktuator mengikuti ambang sensor (otomatis)",
        "controlling.rule_force_on_desc":
            "Aktuator tetap NYALA selama waktu jadwal",
        "controlling.rule_force_off_desc":
            "Aktuator tetap MATI selama waktu jadwal",
        "controlling.no_schedules": "Belum ada jadwal",
        "controlling.add_first_schedule": "Tambah Jadwal Pertama",
        "controlling.add_schedule": "Tambah Jadwal",
        "controlling.max_schedule_reached": "Maksimal jadwal tercapai",
        "controlling.save_all_schedules": "Simpan Semua Jadwal",
        "controlling.schedule_label": "Jadwal",
        "controlling.invalid_time_range": "Rentang waktu tidak valid",
        "controlling.delete_schedule": "Hapus Jadwal",
        "controlling.start_time": "Waktu Mulai",
        "controlling.end_time": "Waktu Selesai",
        "controlling.actuator_settings": "Pengaturan Aktuator",
        "controlling.force_on": "Paksa NYALA",
        "controlling.force_off": "Paksa MATI",
        "controlling.all_follow_threshold":
            "Semua aktuator mengikuti ambang",
        "controlling.threshold_mode": "Ambang Batas",
        "controlling.unsaved_threshold_changes":
            "Ada perubahan ambang batas yang belum disimpan!",
        "controlling.unsaved_schedule_changes":
            "Ada perubahan jadwal yang belum disimpan!",
        "controlling.no_threshold_changes":
            "Tidak ada perubahan untuk disimpan.",
        "controlling.threshold_updated": "Ambang batas berhasil diperbarui!",
        "controlling.failed_update_threshold":
            "Gagal memperbarui ambang batas.",
        "controlling.max_schedule":
            "Maksimal 4 jadwal per greenhouse!",
        "controlling.schedule_deleted": "Jadwal berhasil dihapus!",
        "controlling.failed_delete_schedule": "Gagal menghapus jadwal.",
        "controlling.invalid_schedule_time":
            "Periksa waktu jadwal. Waktu mulai harus sebelum waktu selesai.",
        "controlling.schedule_saved": "Jadwal berhasil disimpan!",
        "controlling.failed_save_schedule": "Gagal menyimpan jadwal.",
        "controlling.validation_failed_prefix": "Validasi gagal: ",
        "heatmap.safe": "Aman",
        "heatmap.normal": "Normal",
        "heatmap.warning": "Waspada",
        "heatmap.critical": "Kritis",
        "auth.login_title": "Masuk",
        "auth.register_title": "Daftar",
        "auth.forgot_password_title": "Lupa Kata Sandi",
        "auth.reset_password_title": "Atur Ulang Kata Sandi",
        "auth.confirm_password_title": "Konfirmasi Kata Sandi",
        "auth.verify_email_title": "Verifikasi Email",
        "auth.name": "Nama",
        "auth.email": "Email",
        "auth.username": "Username",
        "auth.password": "Kata Sandi",
        "auth.confirm_password": "Konfirmasi Kata Sandi",
        "auth.login": "Masuk",
        "auth.register": "Daftar",
        "auth.forgot_password_desc":
            "Lupa kata sandi? Masukkan email Anda dan kami akan mengirim tautan untuk mengatur ulang kata sandi.",
        "auth.email_password_reset_link":
            "Kirim Tautan Atur Ulang Kata Sandi",
        "auth.reset_password": "Atur Ulang Kata Sandi",
        "auth.confirm_password_desc":
            "Ini adalah area aman aplikasi. Silakan konfirmasi kata sandi sebelum melanjutkan.",
        "auth.confirm": "Konfirmasi",
        "auth.already_registered": "Sudah punya akun?",
        "auth.verify_email_desc":
            "Terima kasih sudah mendaftar. Sebelum mulai, verifikasi alamat email Anda melalui tautan yang kami kirim. Jika belum menerima email, kami bisa mengirim ulang.",
        "auth.verification_link_sent":
            "Tautan verifikasi baru sudah dikirim ke alamat email yang Anda daftarkan.",
        "auth.resend_verification_email": "Kirim Ulang Verifikasi Email",
    },
    en: {
        "layout.brand_console": "Greenhouse Console",
        "layout.navigation": "Navigation",
        "layout.system_status": "System Status",
        "layout.dashboard_ready": "Dashboard online and ready",
        "layout.header_subtitle": "Atomic greenhouse operation center",
        "layout.close_sidebar": "Close sidebar",
        "layout.toggle_navigation": "Toggle navigation",
        "layout.logout": "Log Out",
        "layout.language": "Language",
        "layout.lang_id": "Indonesia",
        "layout.lang_en": "English",
        "nav.monitoring": "Monitoring",
        "nav.monitoring_desc": "Live sensor overview",
        "nav.heatmap": "Heatmap",
        "nav.heatmap_desc": "Spatial condition map",
        "nav.table": "Table",
        "nav.table_desc": "Historical data explorer",
        "nav.camera": "Camera",
        "nav.camera_desc": "Fog image timeline",
        "nav.controlling": "Controlling",
        "nav.controlling_desc": "Threshold and schedule",
        "title.monitoring": "Monitoring",
        "title.heatmap": "Heatmap",
        "title.table": "Table",
        "title.camera": "Camera",
        "title.controlling": "Controlling",
        "common.all": "All",
        "common.of": "of",
        "common.to": "to",
        "common.no_data": "No data",
        "common.unexpected_error": "Whoops! Something went wrong.",
        "sensor.temperature": "Temperature",
        "sensor.humidity": "Humidity",
        "sensor.light_intensity": "Light Intensity",
        "monitoring.time": "Time",
        "monitoring.latest_data": "Latest Data",
        "monitoring.status": "Status",
        "monitoring.exhaust_fan": "Exhaust Fan",
        "monitoring.dehumidifier": "Dehumidifier",
        "monitoring.blower": "Drum Fan",
        "monitoring.camera": "Camera",
        "monitoring.on": "ON",
        "monitoring.off": "OFF",
        "monitoring.average": "Average",
        "monitoring.per_node": "Per Node",
        "monitoring.range_custom": "Custom",
        "monitoring.range_1h": "1 Hour",
        "monitoring.range_1d": "1 Day",
        "monitoring.range_1w": "1 Week",
        "monitoring.range_1m": "1 Month",
        "monitoring.date": "Date",
        "monitoring.hour": "Hour",
        "monitoring.loading_chart": "Loading chart...",
        "monitoring.no_data": "No data available.",
        "monitoring.loading_gauge": "Loading gauge...",
        "monitoring.failed_load_chart": "Failed to load chart.",
        "monitoring.failed_load_data": "Failed to load data.",
        "camera.date_time": "Date Time",
        "camera.fog_accuracy": "Fog Accuracy",
        "camera.status": "Status",
        "camera.time": "Time",
        "camera.latest_data": "Latest Data",
        "camera.export": "Export",
        "camera.all": "All",
        "camera.show": "Show",
        "camera.per_page": "per page",
        "camera.showing": "Showing",
        "camera.page_no_data": "No data",
        "camera.pick_date_range": "Pick a date range",
        "camera.status_foggy": "Foggy",
        "camera.status_clear": "Clear",
        "camera.status_unknown": "Unknown",
        "camera.accuracy": "Accuracy",
        "camera.failed_load_data": "Failed to load data.",
        "camera.date_range_required": "Date range is required.",
        "camera.zip_downloaded": "ZIP file downloaded successfully.",
        "camera.no_data_selected_range":
            "No data found for selected date range.",
        "camera.failed_download": "Failed to download file.",
        "table.failed_load_data": "Failed to load data.",
        "table.date_range_required": "Date range is required.",
        "table.excel_downloaded": "Excel file downloaded successfully.",
        "table.failed_download": "Failed to download file.",
        "table.no": "No",
        "table.node": "Node",
        "table.date": "Date",
        "table.time": "Time",
        "table.temperature": "Temperature (°C)",
        "table.humidity": "Humidity (%)",
        "table.light_intensity": "Light Intensity (lx)",
        "table.rssi": "RSSI (dBm)",
        "table.monitoring_data": "Monitoring Data",
        "table.filter_by_date": "Filter by Date",
        "table.all_nodes": "All Nodes",
        "table.export": "Export",
        "table.export_current_view": "Export current view to Excel",
        "table.loading_data": "Loading data...",
        "controlling.threshold_tab": "Threshold",
        "controlling.scheduling_tab": "Scheduling",
        "controlling.min": "Min",
        "controlling.max": "Max",
        "controlling.save_thresholds": "Save Thresholds",
        "controlling.scheduling_mode": "Scheduling Mode",
        "controlling.rule_threshold_desc":
            "Actuator follows sensor threshold (automatic)",
        "controlling.rule_force_on_desc":
            "Actuator stays ON during scheduled time",
        "controlling.rule_force_off_desc":
            "Actuator stays OFF during scheduled time",
        "controlling.no_schedules": "No schedules created yet",
        "controlling.add_first_schedule": "Add First Schedule",
        "controlling.add_schedule": "Add Schedule",
        "controlling.max_schedule_reached": "Maximum schedules reached",
        "controlling.save_all_schedules": "Save All Schedules",
        "controlling.schedule_label": "Schedule",
        "controlling.invalid_time_range": "Invalid time range",
        "controlling.delete_schedule": "Delete Schedule",
        "controlling.start_time": "Start Time",
        "controlling.end_time": "End Time",
        "controlling.actuator_settings": "Actuator Settings",
        "controlling.force_on": "Force ON",
        "controlling.force_off": "Force OFF",
        "controlling.all_follow_threshold": "All actuators follow threshold",
        "controlling.threshold_mode": "Threshold",
        "controlling.unsaved_threshold_changes":
            "There are unsaved threshold changes.",
        "controlling.unsaved_schedule_changes":
            "There are unsaved schedule changes.",
        "controlling.no_threshold_changes":
            "There are no changes to save.",
        "controlling.threshold_updated": "Threshold updated successfully.",
        "controlling.failed_update_threshold": "Failed to update threshold.",
        "controlling.max_schedule":
            "Maximum 4 schedules per greenhouse.",
        "controlling.schedule_deleted": "Schedule deleted successfully.",
        "controlling.failed_delete_schedule": "Failed to delete schedule.",
        "controlling.invalid_schedule_time":
            "Check schedule time. Start time must be before end time.",
        "controlling.schedule_saved": "Schedule saved successfully.",
        "controlling.failed_save_schedule": "Failed to save schedule.",
        "controlling.validation_failed_prefix": "Validation failed: ",
        "heatmap.safe": "Safe",
        "heatmap.normal": "Normal",
        "heatmap.warning": "Warning",
        "heatmap.critical": "Critical",
        "auth.login_title": "Log In",
        "auth.register_title": "Register",
        "auth.forgot_password_title": "Forgot Password",
        "auth.reset_password_title": "Reset Password",
        "auth.confirm_password_title": "Confirm Password",
        "auth.verify_email_title": "Email Verification",
        "auth.name": "Name",
        "auth.email": "Email",
        "auth.username": "Username",
        "auth.password": "Password",
        "auth.confirm_password": "Confirm Password",
        "auth.login": "Log In",
        "auth.register": "Register",
        "auth.forgot_password_desc":
            "Forgot your password? No problem. Enter your email and we will send you a password reset link.",
        "auth.email_password_reset_link": "Email Password Reset Link",
        "auth.reset_password": "Reset Password",
        "auth.confirm_password_desc":
            "This is a secure area of the application. Please confirm your password before continuing.",
        "auth.confirm": "Confirm",
        "auth.already_registered": "Already registered?",
        "auth.verify_email_desc":
            "Thanks for signing up! Before getting started, verify your email by clicking the link we just sent. If you did not receive it, we can resend it.",
        "auth.verification_link_sent":
            "A new verification link has been sent to the email address you provided during registration.",
        "auth.resend_verification_email": "Resend Verification Email",
    },
};

const locale = ref(DEFAULT_LOCALE);
let initialized = false;

const normalizeLocale = (nextLocale) =>
    SUPPORTED_LOCALES.includes(nextLocale) ? nextLocale : DEFAULT_LOCALE;

const initLocale = () => {
    if (initialized) {
        return;
    }

    initialized = true;
    if (typeof window === "undefined") {
        locale.value = DEFAULT_LOCALE;
        return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    locale.value = normalizeLocale(saved);
};

const setLocale = (nextLocale) => {
    const normalized = normalizeLocale(nextLocale);
    locale.value = normalized;

    if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, normalized);
    }
};

const t = (key, fallback = "") => {
    const byLocale = messages[locale.value] || messages[DEFAULT_LOCALE];
    const byDefault = messages[DEFAULT_LOCALE];
    return (byLocale[key] ?? byDefault[key] ?? fallback) || key;
};

export const useLocale = () => {
    initLocale();
    return { locale, setLocale, t };
};
