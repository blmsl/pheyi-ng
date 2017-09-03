import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CartegoriesComponent } from './cartegories/cartegories.component';
import { OrdersComponent } from './orders/orders.component';
import { SalesComponent } from './sales/sales.component';
 import { DetailsComponent } from './details/details.component';
import { PayComponent } from './pay/pay.component';
import { CartService } from "app/cart/shared/cart.service";
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSidenavComponent } from './ui/admin-sidenav/admin-sidenav.component';
import { AdminService } from './admin/shared/admin.service';
import { PaymentSpinnerComponent } from './ui/payment-spinner/payment-spinner.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsService } from "app/reviews/shared/reviews.service";
import { PushnotificationComponent } from './pushnotification/pushnotification.component';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { MessagingService } from "app/messaging.service";
import { ShippingService } from "app/shipping.service";
import { HeroSliderComponent } from './hero-slider/hero-slider.component';

import { DataTableModule } from 'angular-4-data-table';

//---Angular Material Components
import {
      MdCheckboxModule
  } from '@angular/material';
import { MenuService } from "app/nav/menu-service.service";
import { AuthService } from "app/auth.service";
import { AuthGuard } from "app/auth-guard.service";
import { UserService } from "app/user.service";
import { AdminAuthGuard } from "app/admin-auth-guard.service";
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from "app/category.service";
import { ProductService } from "app/product.service";
import { ItemsService } from "app/items/shared/items.service";
import { ShoppingCartService } from "app/shopping-cart.service";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'shopping/:key/:dress', component:DetailsComponent},

  { path: 'pay_callback/:ref/', component:PayComponent, canActivate: [AuthGuard]},
  
  
  { path: 'store', component: StoreComponent},
  { path: 'cartegories', component : CartegoriesComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate : [AuthGuard]},

  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'admin', component:AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},

  { path: '**', component: HomeComponent},

]

 export const firebaseConfig = {
    apiKey: "AIzaSyBKiBU8NnUOzbv1tEj3B0axhkp9s6tnS-A",
    authDomain: "pheyi-161501.firebaseapp.com",
    databaseURL: "https://pheyi-161501.firebaseio.com",
    projectId: "pheyi-161501",
    storageBucket: "pheyi-161501.appspot.com",
    messagingSenderId: "465238772491"
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    StoreComponent,
    NavComponent,
    FooterComponent,
    CartegoriesComponent,
    OrdersComponent,
    SalesComponent,
    DetailsComponent,
    PayComponent,
    LoadingSpinnerComponent,
    AdminComponent,
    AdminSidenavComponent,
    PaymentSpinnerComponent,
    ReviewsComponent,
    PushnotificationComponent,
    HeroSliderComponent,
    ProductFormComponent,
    ProductQuantityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdCheckboxModule
  ],
  providers: [
    CartService,
    AdminService,
    ReviewsService,
    MessagingService,
    ShippingService,
    MenuService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ItemsService,
    ShoppingCartService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
