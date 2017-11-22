import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from "app/shared/services/order.service";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(
    private orderService: OrderService,
  ) { 

    this.orders$ = orderService.getOrders();
  
  }
}
