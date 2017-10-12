import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { FormControl, NgForm } from "@angular/forms";


import { AngularFireAuth } from "angularfire2/auth";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { Subscription } from "rxjs/Subscription";
import { ProductService } from "app/shared/services/product.service";
import { Title } from "@angular/platform-browser";
import { Product } from 'shared/models/app-products';
import { ShoppingCart } from 'shared/models/app-shopping-cart';
import { CartService } from 'app/shopping/services/cart.service';
import { ReviewsService } from 'app/shopping/services/reviews.service';
import { Item } from 'app/shopping/components/items/shared/item';
import { ItemsService } from 'app/shopping/components/items/shared/items.service';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {

  allItemsArray: Item[] = [];
  reviewList: FirebaseListObservable<any[]>;

  item: Product;
  itemTitle : string [] = [];
  isSoldOut : boolean;

  user: string;
  authState;


  AlsoLike: Item[] = [];

  key: string;


  showSpinner : boolean = true;
  showContent : boolean = false;

  cart : ShoppingCart;
  subscription : Subscription;
  isQuantity : boolean = false;
  
  constructor(private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db:AngularFireDatabase,
    private router : Router,
    private itemSvc: ItemsService,
    private cartSvc: CartService,
    private cartService : ShoppingCartService,
    private productService : ProductService,
    private reviewSvc : ReviewsService,
    private titleService : Title
  ) { 

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);

    //scroll to top on activation
    window.scrollTo(0,0);

    //get key from route params
    this.route.params.subscribe(
      (params: Params) => {
        this.key = params['key'];

        //get reviewList
        this.reviewList = this.reviewSvc.getReviewsList({ orderByChild : 'dressKey', equalTo: this.key});
        

        //get details by key
       this.productService.get(this.key).subscribe(
        
        (item) => {
          this.item = item;
          this.isSoldOut = item.isSoldOut;
          this.showSpinner = false;
          this.showContent = true;

          this.titleService.setTitle("Pheyi | "+this.item.title + " at pheyi.ng");
        }
      );
             
        //get items for you may also like      
        this.itemSvc.getItemsList({ limitToLast: 4 }).subscribe((alsoLikes)=>{
          alsoLikes.forEach(alsoLike => {
            const title = alsoLike.title.replace(/\s+/g, '-'); //for SEO
            this.itemTitle.push(title);
            this.AlsoLike.push(alsoLike);   
            
          })
        });        
      }
    );
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.item)
  }

  openCart(){
    var toggleCart = $('a[href=#cart]').trigger("click");
  }

}
