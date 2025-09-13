<template>
    <section class="container h-svh py-4 md:py-20 mx-auto">
        <Card class="shadow-md py-8 animate-fade h-full relative">
            <Browse></Browse>
            <CardContent class="h-full px-4 md:px-16">
                <Datatable
                    title="Product Search"
                    :items="allProducts"
                    search-placeholder="Search by SKU or Products"
                    :loading="productsPending"
                    :error="error?.message"
                    :headers="[
                        {
                            value: 'id',
                            text: 'ID',
                            searchable: true,
                            width: '300px',
                            class: 'text-center',
                        },
                        {
                            value: 'name',
                            text: 'Product Name',
                            searchable: true,
                            width: '200px',
                            badge: true,
                            class: 'text-center',
                        },
                        {
                            value: 'supplierId',
                            text: 'Supplier Id',
                            class: 'text-center',
                            searchable: true,
                            tooltip: true,
                        },
                        {
                            value: 'childProducts',
                            text: 'Child Products',

                            class: 'text-center',
                            expanded: true,
                            searchable: true,
                            tooltip: true,
                        },
                    ]"
                ></Datatable>
            </CardContent>
        </Card>
    </section>
</template>
<script lang="ts" setup>
import type { PaginatedResponse, Product } from "@/types/product";

const products = ref<PaginatedResponse<Product> | null>(null);
const { data, error } = await useFetch<PaginatedResponse<Product>>("/api/products");
products.value = data.value ?? null;
const allProducts = computed(() => products?.value?.data ?? []);

const productsPending = ref(true);
onMounted(() =>
    setTimeout(() => {
        productsPending.value = false;
    }, 2000),
);
</script>
