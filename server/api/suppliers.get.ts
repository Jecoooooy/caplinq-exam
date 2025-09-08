export default defineEventHandler(async () => {
    const data = await useStorage().getItem("data:suppliers.json");
    return data;
});
