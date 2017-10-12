import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { PaymentGatewayService } from "app/shared/services/payment-gateway.service";
import { OrderService } from "app/shared/services/order.service";

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  message: any;
  reference: string;
  status : boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private paymentService : PaymentGatewayService,
    private orderService : OrderService,
    private cartService : ShoppingCartService) { 

    route.queryParamMap.subscribe(params => this.reference = params.get('reference'));
  }

  ngOnInit() {

    this.paymentService.confirmPaystackPayment(this.reference)
      .subscribe(

        response => {
          let payload = response.json().data;

          if(payload.status === "success"){
            this.status = true;
            this.message = payload.status;

            this.orderService.payForOrder(this.reference);
            this.cartService.clearCart();
    
          }else{
            this.status = false;
          }
        },

        error =>{
          this.status = false;
          this.message = JSON.parse(error._body).message;
        },

        () => {
          //TODO : finally
        }
    )
      
  }

}
