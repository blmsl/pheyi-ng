import { HttpClientModule } from '@angular/common/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdButtonToggleModule, MdCheckboxModule } from '@angular/material';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroSliderComponent } from 'app/core/components/hero-slider/hero-slider.component';


//---Angular Material Components


const appRoutes: Routes = [
  { path: '', component: HomeComponent},

  { path: '', loadChildren:'app/core/core.module#CoreModule'},
  { path: 'login',loadChildren:'app/core/core.module#CoreModule'},
  { path: 'register', loadChildren:'app/core/core.module#CoreModule'},
  { path: '**', loadChildren:'app/core/core.module#CoreModule'},

  { path: 'shopping/:key/:dress', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
  { path: 'check-out', loadChildren:'app/shopping/shopping.module#ShoppingModule'},  
  { path: 'order-success/:trxref/:reference', loadChildren:'app/shopping/shopping.module#ShoppingModule'},  
  { path: 'pay_callback/:ref/', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
  { path: 'store', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
  { path: 'cartegories', loadChildren:'app/shopping/shopping.module#ShoppingModule' },
  { path: 'my-orders', loadChildren:'app/shopping/shopping.module#ShoppingModule'},
  { path: 'sales', loadChildren:'app/shopping/shopping.module#ShoppingModule'},

  { path: 'admin-orders', loadChildren:'app/admin/admin.module#AdminModule'},
  
  { path: 'admin/products/new', loadChildren:'app/admin/admin.module#AdminModule'},
  { path: 'admin/products/:id', loadChildren:'app/admin/admin.module#AdminModule'},
  { path: 'admin', loadChildren:'app/admin/admin.module#AdminModule'},
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
    HeroSliderComponent,
    
  ],
  imports: [

    SharedModule,
    CoreModule,

   
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    
    AngularFireModule,    
    AngularFireModule.initializeApp(firebaseConfig),

   
    MdCheckboxModule,
    MdButtonToggleModule
  ],

  providers: [
    Title,  
    // ApplicationRef 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
