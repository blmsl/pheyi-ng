import { RegisterComponent } from 'app/core/components/register/register.component';
import { LoginComponent } from './core/components/login/login.component';
import { StoreComponent } from 'app/shopping/components/store/store.component';
import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    
    { path: 'home', loadChildren:'./core/core.module#CoreModule'},
    { path: 'login',loadChildren:'./core/core.module#CoreModule'},
    { path: 'register', loadChildren:'app/core/core.module#CoreModule'},
    // { path: '**', loadChildren:'app/core/core.module#CoreModule'},
  
    { path: 'shopping/:key/:dress', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
    { path: 'check-out', loadChildren:'app/shopping/shopping.module#ShoppingModule'},  
    { path: 'order-success/:trxref/:reference', loadChildren:'app/shopping/shopping.module#ShoppingModule'},  
    { path: 'pay_callback/:ref/', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
    { path: 'store', loadChildren:'./shopping/shopping.module#ShoppingModule'},
    { path: 'cartegories', loadChildren:'app/shopping/shopping.module#ShoppingModule' },
    { path: 'my-orders', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
    { path: 'sales', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
  
    { path: 'admin-orders', loadChildren:'app/admin/admin.module#AdminModule'}, 
    { path: 'admin/products/new', loadChildren:'app/admin/admin.module#AdminModule'},
    { path: 'admin/products/:id', loadChildren:'app/admin/admin.module#AdminModule'},
    { path: 'admin', loadChildren:'app/admin/admin.module#AdminModule'},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }