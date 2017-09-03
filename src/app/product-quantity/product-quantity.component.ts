import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";
import { Subscription } from "rxjs/Subscription";
import { Product } from "app/models/app-products";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product : Product;
  constructor(private cartService : ShoppingCartService) { }

  cart : ShoppingCart;
  subscription : Subscription;
  // item: Product;
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  async ngOnInit() {

    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }
  addItemToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }
  getQuantity(){
    if(!this.cart) return 0;

    let item = this.cart.itemsMap[this.product.$key];
    return item ? item.quantity : 0;
  }

}
