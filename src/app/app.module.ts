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
import { AppRoutingModule } from 'app/app-routing.module';
import { CommonModule } from '@angular/common';


//---Angular Material Components

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
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,

    SharedModule,
    CoreModule,
    ShoppingModule,
    AdminModule,

    AppRoutingModule,

    HttpModule,
    HttpClientModule,
    
    AngularFireModule,    
    AngularFireModule.initializeApp(firebaseConfig),

    MdCheckboxModule,
    MdButtonToggleModule
  ],

  providers: [
    Title,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
