import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Item } from 'app/shopping/components/items/shared/item';
import { ItemsService } from 'app/shopping/components/items/shared/items.service';

declare var jquery: any;
declare var $: any;
// import { AngularFire, FirebaseListObservable } from "angularfire2";


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit, OnDestroy {
    showSpinnerJustIn: boolean = true;
    showSpinner: boolean = true;
    cartItems: FirebaseListObservable<any[]>;

    bestSellers: Item[];
    newArrivals: Item[];

    user: any;
    sum;
    images: any[];
    itemTitleBestSellers: string[] = [];
    itemTitleNewArrivals: string[] = [];

    defaultImage = 'assets/Spinner.gif';
    offset = 200;

    specialOfferImage1 = "assets/shop/Black-pencil-dress-1.jpg";
    specialOfferImage2 = "assets/shop/Black-and-white-pattern-pencil-dress-1.jpg"

    constructor(private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private itemSvc: ItemsService) {

        this.sum = 0;

    }

    ngOnDestroy() {
    }

    ngOnInit() {

        //get all best sellers
        this.itemSvc.getItemsList({
            orderByChild: 'isBestSeller',
            equalTo: true,
            limitToLast: 6
        }).subscribe(bestSellers => {
            this.bestSellers = bestSellers;
            this.bestSellers.reverse();
            
            bestSellers.forEach(bestSeller => {
                var title = bestSeller.title.replace(/\s+/g, '-');
                this.itemTitleBestSellers.push(title);
            })
            this.showSpinner = false;
        })

        //get all new arrivals
        this.itemSvc.getItemsList({
            orderByChild: 'isNewArrival',
            equalTo: true,
            limitToLast: 4
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
