import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from 'app/admin/admin.component';
import { AdminOrdersComponent } from 'app/admin/components/admin-orders/admin-orders.component';
import { ProductFormComponent } from 'app/admin/components/product-form/product-form.component';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-4-data-table';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'admin-orders', component: AdminOrdersComponent, canActivate : [AuthGuard, AdminAuthGuard]},
      { path: 'admin-orders/:id', component: AdminOrderComponent, canActivate : [AuthGuard, AdminAuthGuard]},
    
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      { path: 'admin', component:AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    ]),
    
  ],
  declarations: [

    AdminComponent,    
    AdminOrdersComponent,
    ProductFormComponent,
    AdminOrderComponent,
  ],
  providers:[
    AdminAuthGuard,
    
  ]
})
export class AdminModule { }
