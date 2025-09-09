<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script lang="ts" setup>
useHead({
    title: "Caplinq",
    meta: [
        { name: "description", content: "front-end developer examination" },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
    ],
    bodyAttrs: {},
});
</script>
