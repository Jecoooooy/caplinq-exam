<template>
    <section class="container h-svh py-20 mx-auto">
        <Card class="shadow-md h-full relative">
            <Browse></Browse>
            <CardContent class="h-full">
                <Datatable
                    title="Product Search"
                    :items="allProducts"
                    search-placeholder="Search by SKU or Products"
                    :loading="productsPending"
                    :error="null"
                    :headers="[
                        {
                            value: 'name',
                            text: 'Product Name',
                            searchable: true,
                            width: '200px',
                            class: 'text-center',
                            tooltip: true,
                        },
                        {
                            value: 'supplierId',
                            text: 'Suplier Id',
                            width: '200px',
                            class: 'text-center',
                            searchable: true,
                            tooltip: true,
                        },
                        {
                            value: 'childProducts',
                            text: 'Suplier Id',
                            class: 'text-center',
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
const {
    data: products,
    pending: productsPending,
    error: productsError,
} = await useFetch("/api/products");
console.log(productsError);
const allProducts = computed(() => products.value?.data ?? []);
const {
    data: suppliers,
    pending: suppliersPending,
    error: suppliersError,
} = await useFetch("/api/suppliers");
</script>
