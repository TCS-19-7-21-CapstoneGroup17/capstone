export interface Order {
    _id: number;
    productId: number;
    price: number;
    date: string;
    quantity: number;
    status: string;
}