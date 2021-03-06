import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "app/shared/services/auth.service";
import { CartItem } from 'app/shared/models/cartItem';


@Injectable()
export class CartService {
  shoppingCart: FirebaseObjectObservable<any>;

  private basePath = '/shoppingCart';

  pushKey: string;
  cartItems: FirebaseListObservable<CartItem[]>;
  cartItem: FirebaseObjectObservable<CartItem>;

  cartItemsCount: number;
  totalPrice: number;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private auth : AuthService) {

  }

  //Return a single item
  getItem(userKey : string , key: string): FirebaseObjectObservable<CartItem> {
    const itemPath = `${this.basePath}/${userKey}/${key}`;
    this.cartItem = this.db.object(itemPath);
    return this.cartItem;
  }
  getCartItemsList(userKey : string , query = {}): FirebaseListObservable<CartItem[]> {
    const path = `${this.basePath}/${userKey}`;
    this.cartItems = this.db.list(path, {
      query: query
    });
    return this.cartItems;
  }

  getCartItemsCount(userKey : string): number {
    const cartPath = `${this.basePath}/${userKey}`;

    this.db.list(cartPath).subscribe((items) => this.cartItemsCount = items.length);

    return this.cartItemsCount;
  }

  getTotalPrice(userKey: string): number {
    const cartPath = `${this.basePath}/${userKey}`;

    this.db.list(cartPath).subscribe((items) => {
      items.forEach((item) => {
        this.totalPrice += item.price;
      })
    })
    return this.totalPrice;
  }
  updateItem(key: string, value: any): void {
    this.cartItems.update(key, value)
      .catch(error => console.error(error));
  }
  addItemToCart(userKey: string, item: CartItem): string {
    const cartPath = `${this.basePath}/${userKey}`;
    return this.db.list(cartPath).push(item).key;
  }

  removeItem(userKey: string, key: string): void {
    const cartPath = `${this.basePath}/${userKey}`;

    this.db.list(cartPath).remove(key)
      .catch(error => console.error(error));
  }

  removeAll(): void {
     const itemPath = `${this.basePath}/${this.afAuth.auth.currentUser.uid}`
     this.shoppingCart = this.db.object(itemPath);
    
     this.shoppingCart.remove()
       .catch(error => console.error(error));
  }

}
