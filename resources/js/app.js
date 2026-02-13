require("./bootstrap");

import { createApp, h } from "vue";
import { createInertiaApp, config } from "@inertiajs/vue3";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { ZiggyVue } from "ziggy-js";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

config.set({
    "prefetch.cacheFor": 60000,
    "prefetch.hoverDelay": 50,
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        import(
            /* webpackChunkName: "page-[request]" */ `./Pages/${name}.vue`
        ),
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(Toast)
            .use(ZiggyVue, window.Ziggy)
            .mount(el);
    },
});
