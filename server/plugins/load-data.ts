import productsData from "../data/products.json";
import suppliersData from "../data/suppliers.json";

export default defineNitroPlugin(async (nitroApp) => {
    // Load data into Nitro storage on server startup
    await useStorage().setItem("data:products.json", productsData);
    await useStorage().setItem("data:suppliers.json", suppliersData);

    console.log("✅ Data loaded into memory storage");
});
