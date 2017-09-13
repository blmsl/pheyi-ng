import { Product } from "app/models/app-products";

export class ShoppingCartItem {
 
    $key : string;
    title: string;
    imageURL: string;
    price: number;
    quantity: number;
    selectedSize : number;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice(){ return this.price * this.quantity; }
}