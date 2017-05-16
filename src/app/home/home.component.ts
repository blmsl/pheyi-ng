import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";


@Component({
    templateUrl : './home.component.html',
    styleUrls:['./home.component.css'],
})


export class HomeComponent {
    cartItems: FirebaseListObservable<any[]>;
    bestSellers : FirebaseListObservable<any[]>;
    newArrivals : FirebaseListObservable<any[]>;
    user : any;
    sum;
    images : any[];

    constructor(private af : AngularFire){
        this.sum = 0;

        this.af.auth.subscribe(authState =>{
            this.user = authState.uid
        })

        // this.cartItems =  this.ct.getCartItems();
    }

    ngOnInit(){

        //get all best sellers
        this.bestSellers = this.af.database.list('/items', {
            query:{
                orderByChild : 'isBestSeller',
                equalTo : true,
                limitToLast : 3,
            }
        })

        //get all new arrivals
        this.newArrivals = this.af.database.list('/items',{
           query:{
               orderByChild : 'isNewArrival',
               equalTo : true,
               limitToLast : 8
           }
        })
    }

   
}
