<template>
    <div class="h-svh grid container mx-auto grid-cols-2 overflow-auto">
        <pre>{{ products }}</pre>
        <pre>{{ suppliers }}</pre>
    </div>
</template>
<script lang="ts" setup>
const {
    data: products,
    pending: producsPending,
    error: productsError,
} = await useFetch("/api/products");
const {
    data: suppliers,
    pending: suppliersPending,
    error: suppliersError,
} = await useFetch("/api/suppliers");
</script>
