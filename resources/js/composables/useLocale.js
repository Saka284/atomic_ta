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
        "nav.monitoring": "Monitoring",
        "nav.monitoring_desc": "Ringkasan sensor langsung",
        "nav.heatmap": "Heatmap",
        "nav.heatmap_desc": "Peta kondisi area",
        "nav.table": "Tabel",
        "nav.table_desc": "Riwayat data sensor",
        "nav.camera": "Kamera",
        "nav.camera_desc": "Linimasa gambar kabut",
        "nav.controlling": "Kontrol",
        "nav.controlling_desc": "Ambang dan jadwal",
        "title.monitoring": "Monitoring",
        "title.heatmap": "Heatmap",
        "title.table": "Tabel",
        "title.camera": "Kamera",
        "title.controlling": "Kontrol",
        "monitoring.time": "Waktu",
        "monitoring.latest_data": "Data Terbaru",
        "monitoring.status": "Status",
        "monitoring.exhaust_fan": "Kipas Exhaust",
        "monitoring.dehumidifier": "Dehumidifier",
        "monitoring.blower": "Kipas Sirkulasi",
        "monitoring.on": "NYALA",
        "monitoring.off": "MATI",
        "monitoring.average": "Rata-rata",
        "monitoring.per_node": "Per Node",
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
        "monitoring.time": "Time",
        "monitoring.latest_data": "Latest Data",
        "monitoring.status": "Status",
        "monitoring.exhaust_fan": "Exhaust Fan",
        "monitoring.dehumidifier": "Dehumidifier",
        "monitoring.blower": "Circulation Fan",
        "monitoring.on": "ON",
        "monitoring.off": "OFF",
        "monitoring.average": "Average",
        "monitoring.per_node": "Per Node",
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
