import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'
import { ReactiveFormsModule } from '@angular/forms'

import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ItemsComponent } from './items/items.component';
import { CartegoriesComponent } from './cartegories/cartegories.component';
import { OrdersComponent } from './orders/orders.component';
import { SalesComponent } from './sales/sales.component';
import { DetailsComponent } from './details/details.component';
// import { CartService } from "app/cart.service";




const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'store', component: StoreComponent},
  { path: 'items', component : ItemsComponent},
  { path: 'cartegories', component : CartegoriesComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'sales', component: SalesComponent},
  { path: 'details/:key', component:DetailsComponent}
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
    ItemsComponent,
    CartegoriesComponent,
    OrdersComponent,
    SalesComponent,
    DetailsComponent,
    // CartService,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
