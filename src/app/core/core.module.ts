import { ShoppingModule } from './../shopping/shopping.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { RegisterComponent } from 'app/core/components/register/register.component';
import { NavComponent } from 'app/core/components/nav/nav.component';
import { FooterComponent } from 'app/core/components/footer/footer.component';
import { PushnotificationComponent } from 'app/core/components/pushnotification/pushnotification.component';
import { HeroSliderComponent } from 'app/core/components/hero-slider/hero-slider.component';

@NgModule({
  imports: [
    SharedModule,
    ShoppingModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: '**', component: HomeComponent},
    ])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  
    PushnotificationComponent,
  ],

  exports : [
    NavComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
