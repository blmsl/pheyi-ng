import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import {MdButtonToggleModule} from '@angular/material';
import { AngularFireDatabase } from "angularfire2/database";
import { ActivatedRoute } from "@angular/router";
import { NotifyService } from 'app/shared/services/notify.service';
import { ShoppingCartItem } from 'shared/models/app-shopping-cart-item';
import { Product } from 'shared/models/app-products';
import { ShoppingCart } from 'shared/models/app-shopping-cart';


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
    private route : ActivatedRoute,
    private notify : NotifyService
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

  savePhone(form){
    let phone = form.phone;
   
    this.notify.addPhone(phone);
    alert('Thank you. We\'ll notify you when available.');
  }

}
