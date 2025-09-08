<template>
    <div>
        <Button>t asdeasd st</Button>
        <pre>{{ products }}</pre>
    </div>
</template>
<script lang="ts" setup>
const { data: products, pending, error } = await useFetch("/api/products");
</script>
