<template>
    <section class="container h-svh py-20 mx-auto">
        <Card class="shadow-md h-full relative">
            <Browse></Browse>
            <CardContent class="h-full md:px-16">
                <Datatable
                    title="Product Search"
                    :items="allProducts"
                    search-placeholder="Search by SKU or Products"
                    :loading="productsPending"
                    :error="null"
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
                            class: 'text-center',
                        },
                        {
                            value: 'supplierId',
                            text: 'Suplier Id',
                            class: 'text-center',
                            searchable: true,
                            tooltip: true,
                        },
                        {
                            value: 'childProducts',
                            text: 'Suplier Id',
                            width: '200px',
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
const productStore = useProduct();
const allProducts = computed(() => productStore.products?.data ?? []);

await productStore.getProductPaginate();
const productsPending = ref(true);
onMounted(() =>
    setTimeout(() => {
        productsPending.value = false;
    }, 4000),
);
</script>
