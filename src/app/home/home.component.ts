import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFire, FirebaseListObservable } from "angularfire2";


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

    constructor(private db : AngularFireDatabase, afAuth: AngularFireAuth){
        this.sum = 0;

        // this.user = afAuth.auth.currentUser.uid
        // this.af.auth.subscribe(authState =>{
        //     this.user = authState.uid
        // })

        // this.cartItems =  this.ct.getCartItems();
    }

    ngOnInit(){

        //get all best sellers
        this.bestSellers = this.db.list('/items', {
            query:{
                orderByChild : 'isBestSeller',
                equalTo : true,
                limitToLast : 3,
            }
        })

        //get all new arrivals
        this.newArrivals = this.db.list('/items',{
           query:{
               orderByChild : 'isNewArrival',
               equalTo : true,
               limitToLast : 4
           }
        })
    }

   
}
