export interface Order {
    _id: number;
    productName: string;
    price: number;
    day:number,
    month:number,
    year:number,
    quantity: number;
    status: string;
}