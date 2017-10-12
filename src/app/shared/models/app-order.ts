
import { ShoppingCart } from "app/shared/models/app-shopping-cart";

export class Order {
    datePlaced : number;
    isPayed : boolean;
    items: any[];

    constructor(public userId : string, public shipping : any,  shoppingCart : ShoppingCart){
        this.datePlaced = new Date().getTime();


        this.items = shoppingCart.items.map(i => {
            return {
              product : {
                itemKey : i.$key,
                title : i.title,
                imageURL : i.imageURL,
                price : i.price,
                size : i.selectedSize
              },
              quantity : i.quantity,
              totalPrice : i.totalPrice
            }
          })
    }

}