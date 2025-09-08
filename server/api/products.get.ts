export default defineEventHandler(async () => {
    const data = await useStorage().getItem('data:products.json')
    return data
})
