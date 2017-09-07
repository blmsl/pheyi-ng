import { Component, OnInit, Input } from '@angular/core';
import { ShippingService } from "app/shipping.service";
import { AuthService } from "app/auth.service";
import { ShippingAddress } from "app/ShippingAddress";

@Component({
  selector: 'update-shipping-form',
  templateUrl: './update-shipping-form.component.html',
  styleUrls: ['./update-shipping-form.component.css']
})
export class UpdateShippingFormComponent implements OnInit {
  shipping : any = {};
  userId : string;

  constructor(
    private shippingService : ShippingService,
    private authService : AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  update(shipping : ShippingAddress){
    this.shippingService.update(this.userId, this.shipping);
    alert('shipping details updated! Proceed with your order now.');
  }


}
