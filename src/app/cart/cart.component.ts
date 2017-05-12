import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import { CartService } from "app/cart.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Headers, Http } from "@angular/http";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls:['./cart.component.css'],
    providers: [CartService]
})

export class CartComponent {

    cartItems: FirebaseListObservable<any[]>;
    cartItemForSum: FirebaseListObservable<any[]>;
    order: FirebaseListObservable<any[]>;

    user: any;
    email : any;
    authState : any;
    order_reference : any;
    sum;
    removingPrice;
    currentTotal;
    subtotal: FirebaseObjectObservable<any>;
    shippingExisit;
    hasShippingAddress;
    hasCompleteAdding;
    noOfItems;
    isLoggedIn: boolean;
    shippingForm : FormGroup;


    constructor(private af: AngularFire, private ct: CartService, private http: Http) { }

    ngOnInit() {
        this.hasShippingAddress = false;
        this.hasCompleteAdding = false;

        // this.count = this.ct.getCartCount();

        //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if (authState) {
                this.isLoggedIn = true;
                this.user = authState.uid;
                
                this.authState = authState;

                this.cartItems = this.af.database.list('/shoppingCart/' + authState.uid);

                //get subtotal
                this.subtotal = this.af.database.object('/shoppingTotal/' + this.user);

                //order
                this.order = this.af.database.list('/orders');
            } else {
                this.isLoggedIn = false;
            }
        })


        //create shipping form
        this.shippingForm = new FormGroup({
          'firstname' : new FormControl(null),
          'lastname' : new FormControl(null),
           'phone' : new FormControl(null),
           'address' : new FormControl(null),
           'country': new FormControl(null),
           'state': new FormControl(null),
           'city': new FormControl(null),
           'zipCode': new FormControl(null)
          //  'email' : new FormControl(this.authState.email)
        })

    }

    removeItemFromCart($key: string) {
        var item;

        //get current price
        this.af.database.object('/shoppingCart/' + this.user + '/' + $key).subscribe(snapshot => {
            item = snapshot;
            this.removingPrice = item.price;
        })

        //get total and subtract current price
       var subtotal_subscription =  this.subtotal.subscribe(snapshot => {
            this.currentTotal = snapshot.total;
            this.sum = this.currentTotal - this.removingPrice;
        })

        //update new total
        if (this.sum === 0) {
            this.subtotal.remove().then(
                () => {
                    subtotal_subscription.unsubscribe();
                     document.location.reload(); //reload page to clear cache

                }
            );

        } else {
            this.subtotal.update({
                total: this.sum
            })
        }

        this.cartItems.remove($key);

        //update cart count
        this.ct.removeCartCount(1);


    }

    checkout() {

        this.hasCompleteAdding = true;

        //add item to order with isPayed=false
        //check if order exists before pushKey
        this.af.database.list('orders', {
          query:{
            orderByChild : 'uid',
            equalTo : this.user
          }
        }).subscribe(x => {
          if(x.length === 0){
            this.order_reference = this.order.push({
                uid: this.user,
                isPayed: false,
                amount: '',
                shippingDetails: {},
                items: {},
            }).key;

          }
        })

        //check if user has shipping address
        this.shippingExisit = this.af.database.object('/shipping/' + this.user);
        this.shippingExisit.subscribe(x => {
            if (x && x.$value) {
              this.checkOutWithShipping();

            } else {

                this.hasShippingAddress = true;
                //this.checkoutWithoutShipping();
            }
        })

        //get order reference

        //post to paystack with order_reference

        //redirect to payment url from paystack promise

        //redirect to callback url with reference as params

    }

    backToCart(){
      this.hasShippingAddress = false;
      this.hasCompleteAdding = false;
    }

    //customer has shipping address
    checkOutWithShipping(){
      alert('checkout and pay')
      console.log('shipping  exists')
    }

    //customer does not have shipping address
    checkoutWithoutShipping(){

      var amount_paying;
      this.subtotal.subscribe(snapshot=>{ amount_paying = snapshot })

      this.af.database.list('/shipping/' + this.user)
            .push(this.shippingForm.value)

            .then(x=>{

              //post to paystack and get the redirect url
              let url = `https://api.paystack.co/transaction/initialize`;
              const headers = new Headers({
                  'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
              });
  
            //   headers.append('Authorization', 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3');
            //   headers.append('Content-Type', 'application/json; charset=utf-8');
              var body = {

                reference : this.order_reference,
                email : this.authState.auth.email,
                amount : parseFloat(amount_paying.total) * 100 ,
                callback_url : document.location.origin+'/'

              };

              this.http.post(url, JSON.stringify(body), {headers : headers}).subscribe( response =>{

                  console.log('Authorization URL: '+response.json().data.authorization_url)
                  window.location.href = response.json().data.authorization_url;

              }, error =>{
                console.log(error);
              })
              // alert('proceeding to payment of ..'+ parseFloat(amount_paying.total) * 100 )

            }).then(s=>{
              //redirect user to payment url
              alert('payment completed')
              // console.log('shipping does not exists')

            })

    }

  // payWithPaystack(){
  //   var handler = PaystackPop.setup({
  //     key: 'pk_test_86d32aa1nV4l1da7120ce530f0b221c3cb97cbcc',
  //     email: 'customer@email.com',
  //     amount: 10000,
  //     ref: "UNIQUE TRANSACTION REFERENCE HERE",
  //     metadata: {
  //        custom_fields: [
  //           {
  //               display_name: "Mobile Number",
  //               variable_name: "mobile_number",
  //               value: "+2348012345678"
  //           }
  //        ]
  //     },
  //     callback: function(response){
  //         alert('success. transaction ref is ' + response.reference);
  //     },
  //     onClose: function(){
  //         alert('window closed');
  //     }
  //   });
  //   handler.openIframe();
  // }

}
