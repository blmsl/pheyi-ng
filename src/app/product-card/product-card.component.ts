import { Component, OnInit, Input } from '@angular/core';
import { Product } from "app/models/app-products";
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";
import {MdButtonToggleModule} from '@angular/material';
import { AngularFireDatabase } from "angularfire2/database";
import { ActivatedRoute } from "@angular/router";
import { ShoppingCartItem } from "app/models/app-shopping-cart-item";


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  cartItems: ShoppingCartItem[];

  sizeInCm: any;
  sizeInInches: any;
  toggleState: string;
  size : number;
  productId : string;
  
  
  @Input('key') key : string;
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(
    private cartService : ShoppingCartService, 
    private db: AngularFireDatabase,
    private route : ActivatedRoute
  ) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => console.log(cart.items[this.key]));
  }

  addToCart(){
    this.cartService.addToCart(this.product, this.size);
  }

  toggleSize($uk_size) {
    this.size = $uk_size;
    this.toggleState = "loading ...."

    //inches
    this.db.list('/Sizes/women/inches', {
      query: {
        orderByChild: 'UK',
        equalTo: parseInt($uk_size)
      }
    }).subscribe(snapshot => {
      this.sizeInInches = snapshot;
    })

    //cm
    this.db.list('/Sizes/women/cm', {
      query: {
        orderByChild: 'UK',
        equalTo: parseInt($uk_size)
      }
    }).subscribe(snapshot => {
      this.sizeInCm = snapshot;
      this.toggleState = '';

    })

  }

}