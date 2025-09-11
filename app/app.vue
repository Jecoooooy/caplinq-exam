<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <Toaster position="top-right" rich-colors />
</template>
<script lang="ts" setup>
import "vue-sonner/style.css";
useHead({
    title: "Caplinq",
    link: [
        { rel: "icon", type: "image/webp", href: "/images/caplinq-logo.webp" },
        { rel: "apple-touch-icon", href: "/images/caplinq-logo.webp" },
    ],
    meta: [
        { name: "description", content: "front-end developer examination" },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        { property: "og:image", content: "/images/caplinq-logo.webp" },
        { name: "twitter:image", content: "/images/caplinq-logo.webp" },
    ],
    bodyAttrs: {},
});
</script>
