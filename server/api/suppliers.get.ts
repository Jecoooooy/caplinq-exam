import type { Supplier } from "@/types/supplier";
import { isArray } from "@/utils/typeGuards";
export default defineEventHandler(async (): Promise<Supplier[]> => {
    const data = await useStorage().getItem("data:suppliers.json");
    return isArray<Supplier>(data) ? data : [];
});
