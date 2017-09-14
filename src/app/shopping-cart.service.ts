import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Product } from "app/models/app-products";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from "app/models/app-shopping-cart";
import { Observable } from "rxjs/Observable";
import { ShoppingCartItem } from "app/models/app-shopping-cart-item";

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart() : Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    
    return this.db.object('/shopping-carts/' + cartId)
              .map(x=> new ShoppingCart(x.items))
  }

  async addToCart(product : Product, size : number){
    this.updateItem(product, 1, size);
  }

  async removeFromCart(product : Product){
    this.updateItem(product, -1, 0);
  }

  async clearCart(){
   let cartId = await this.getOrCreateCartId();
   this.db.object('/shopping-carts/'+ cartId + '/items').remove();
  }

  public getItem (cartId:string, productId:string){
    return this.db.object('/shopping-carts/'+ cartId +'/items/' + productId);
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    })
  }

  private async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;   
  }

 

  private async updateItem(product: Product, change : number, size){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if(quantity === 0 ) item$.remove();
      else
       item$.update({
          title : product.title,
          imageURL : product.imageURL,
          price : product.price,
          quantity : quantity,
          selectedSize : size
        });
    })
  }

}
