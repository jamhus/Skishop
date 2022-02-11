export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    brand: string;
    type: string;
    pictureUrl: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}