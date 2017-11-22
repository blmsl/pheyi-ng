import { AppUser } from './../../../shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  user: AppUser;
  order: any = {};
  totalPriceOfOrder = 0;
  id: string;

  constructor(
    private orderService: OrderService,
    private route : ActivatedRoute,
    private userService : UserService
  ) { 
    this.id = route.snapshot.paramMap.get('id');
    
    if(this.id) this.orderService.getOrderById(this.id).take(1).subscribe( order => {
      this.order = order;

      order.items.forEach(product => {
        this.totalPriceOfOrder = this.totalPriceOfOrder + product.totalPrice;
      })
      
      this.userService.get(order.userId).subscribe(user => this.user = user);

    });
  }

  ngOnInit() {
  }

}
