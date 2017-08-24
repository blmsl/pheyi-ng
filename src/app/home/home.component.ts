import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { ItemsService } from "app/items/shared/items.service";
import { Item } from "app/items/shared/item";
// import { AngularFire, FirebaseListObservable } from "angularfire2";


@Component({
    templateUrl : './home.component.html',
    styleUrls:['./home.component.css'],
})


export class HomeComponent {
    showSpinnerJustIn: boolean = true;
    showSpinner: boolean = true;
    cartItems: FirebaseListObservable<any[]>;

    bestSellers : Item[];
    newArrivals : Item[];

    user : any;
    sum;
    images : any[];
    itemTitleBestSellers : string[] = [];
    itemTitleNewArrivals : string[] = [];

    constructor(private db : AngularFireDatabase, 
        private afAuth: AngularFireAuth,
        private itemSvc: ItemsService){

        this.sum = 0;

        // this.user = afAuth.auth.currentUser.uid
        // this.af.auth.subscribe(authState =>{
        //     this.user = authState.uid
        // })

        // this.cartItems =  this.ct.getCartItems();
    }

    ngOnInit(){

        //get all best sellers
       this.itemSvc.getItemsList({
           orderByChild : 'isBestSeller',
           equalTo : true,
           limitToLast : 3
       }).subscribe(bestSellers => {
           this.bestSellers = bestSellers;
           bestSellers.forEach(bestSeller => {
              var title = bestSeller.title.replace(/\s+/g, '-');
              this.itemTitleBestSellers.push(title);
           })
          this.showSpinner = false;
       })

        //get all new arrivals
        this.itemSvc.getItemsList({
           orderByChild : 'isNewArrival',
           equalTo : true,
           limitToLast : 4
       }).subscribe(newArrivals => {
           this.newArrivals = newArrivals;
            newArrivals.forEach(newArrival => {
              var title = newArrival.title.replace(/\s+/g, '-');
              this.itemTitleNewArrivals.push(title);
           })
           this.showSpinnerJustIn = false;
       })
        
    }

   
}
