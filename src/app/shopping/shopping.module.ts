import { CoreModule } from '../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from 'app/shopping/components/cart/cart.component';
import { StoreComponent } from 'app/shopping/components/store/store.component';
import { CartegoriesComponent } from 'app/shopping/components/cartegories/cartegories.component';
import { SalesComponent } from 'app/shopping/components/sales/sales.component';
import { DetailsComponent } from 'app/shopping/components/details/details.component';
import { PayComponent } from 'app/shopping/components/pay/pay.component';
import { ReviewsComponent } from 'app/shopping/components/reviews/reviews.component';
import { CheckOutComponent } from 'app/shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from 'app/shopping/components/order-success/order-success.component';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from 'app/shopping/components/shipping-form/shipping-form.component';
import { MyOrdersComponent } from 'app/shopping/components/my-orders/my-orders.component';
import { UpdateShippingFormComponent } from 'app/shopping/components/update-shipping-form/update-shipping-form.component';
import { ItemsComponent } from 'app/shopping/components/items/items.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { AdminSidenavComponent } from 'shared/components/ui/admin-sidenav/admin-sidenav.component';
import { LoadingSpinnerComponent } from 'shared/components/ui/loading-spinner/loading-spinner.component';
import { PaymentSpinnerComponent } from 'shared/components/ui/payment-spinner/payment-spinner.component';


@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild([
      
      { path: 'shopping/:key/:dress', component:DetailsComponent},
      { path: 'check-out', component: CheckOutComponent , canActivate: [AuthGuard]},  
      { path: 'order-success/:trxref/:reference', component: OrderSuccessComponent , canActivate: [AuthGuard]},  
      { path: 'pay_callback/:ref/', component:PayComponent, canActivate: [AuthGuard]},
      { path: 'store', component: StoreComponent},
      { path: 'cartegories', component : CartegoriesComponent, canActivate: [AuthGuard] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate : [AuthGuard]},
      { path: 'sales', component: SalesComponent, canActivate: [AuthGuard, AdminAuthGuard]},
        
    ])
  ],
  declarations: [
    StoreComponent,
    CartegoriesComponent,
    SalesComponent,
    DetailsComponent,
    PayComponent,
    ReviewsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    MyOrdersComponent,
    UpdateShippingFormComponent,
    ItemsComponent,

  ],

  exports:[
    CartComponent,  
  ],

  providers:[

  ]
})
export class ShoppingModule { }
