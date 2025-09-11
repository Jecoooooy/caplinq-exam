// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },

    modules: [
        "@nuxt/fonts",
        "@nuxt/icon",
        "shadcn-nuxt",
        "@nuxtjs/device",
        "@vueuse/nuxt",
        ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    ],
    imports: { dirs: ["./app/stores"] },
    shadcn: {
        prefix: "",
        componentDir: "./app/components/ui",
    },
    typescript: {
        strict: true,
        typeCheck: false,
        tsConfig: {
            compilerOptions: {
                allowImportingTsExtensions: true,
            },
        },
    },
    nitro: {
        storage: {
            data: {
                driver: "memory",
            },
        },
        // Ensure proper serverless deployment
        preset: "vercel",
    },
});
