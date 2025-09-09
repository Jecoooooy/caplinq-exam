export type PurchasePrice = {
    price: number
    currency: string
    quantityStart: number
    quantityEnd: number
}

export type ChildProduct = {
    id: string
    sku: string
    name: string
    purchasePrices: PurchasePrice[]
}

export type Product = {
    id: string
    name: string
    supplierId: string
    childProducts: ChildProduct[]
}

export type PaginatedResponse<T> = {
    pageIndex: number
    pageSize: number
    count: number
    data: T[]
}
