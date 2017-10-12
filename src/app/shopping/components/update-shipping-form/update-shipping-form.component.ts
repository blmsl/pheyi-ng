import { Component, OnInit, Input } from '@angular/core';
import { ShippingService } from "app/shared/services/shipping.service";
import { AuthService } from "app/shared/services/auth.service";
import { ShippingAddress } from "app/ShippingAddress";

@Component({
  selector: 'update-shipping-form',
  templateUrl: './update-shipping-form.component.html',
  styleUrls: ['./update-shipping-form.component.css']
})
export class UpdateShippingFormComponent implements OnInit {
  shipping : any = {};
  countries : string[] = [];
  userId : string;

  constructor(
    private shippingService : ShippingService,
    private authService : AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.userId = user.uid);
    this.countries = this.shippingService.getCountries();
  }

  update(shipping : ShippingAddress){
    this.shippingService.update(this.userId, this.shipping);
    alert('Shipping details updated! You can proceed with your order now.');
  }

}
