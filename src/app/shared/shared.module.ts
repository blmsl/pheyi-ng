import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HeroSliderComponent } from 'app/core/components/hero-slider/hero-slider.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminService } from 'app/shared/services/admin.service';
// import { MenuService } from 'app/nav/menu-service.service';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { MessagingService } from 'shared/services/messaging.service';
import { NotifyService } from 'shared/services/notify.service';
import { OrderService } from 'shared/services/order.service';
import { PaymentGatewayService } from 'shared/services/payment-gateway.service';
import { ProductService } from 'shared/services/product.service';
import { ShippingService } from 'shared/services/shipping.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdCheckboxModule, MdButtonToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular-4-data-table';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from 'app/shopping/services/cart.service';
import { ReviewsService } from 'app/shopping/services/reviews.service';
import { ItemsService } from 'app/shopping/components/items/shared/items.service';
import { AdminSidenavComponent } from 'shared/components/ui/admin-sidenav/admin-sidenav.component';
import { LoadingSpinnerComponent } from 'shared/components/ui/loading-spinner/loading-spinner.component';
import { PaymentSpinnerComponent } from 'shared/components/ui/payment-spinner/payment-spinner.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CartComponent } from 'app/shopping/components/cart/cart.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from 'shared/components/nav/nav.component';
import { FooterComponent } from 'shared/components/footer/footer.component';
import { MenuService } from 'shared/components/nav/menu-service.service';

@NgModule({
  imports: [
    CommonModule,
  
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule,

    NgbModule.forRoot().ngModule,
    MdCheckboxModule,
    MdButtonToggleModule,

    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LazyLoadImageModule,
    
 
  ],
  declarations: [
    ProductQuantityComponent,
    ProductCardComponent,
    AdminSidenavComponent,
    LoadingSpinnerComponent,
    PaymentSpinnerComponent,
    NavComponent,
    CartComponent,
    FooterComponent,
    
  ],
  exports : [
    ProductQuantityComponent,
    ProductCardComponent,
    AdminSidenavComponent,
    LoadingSpinnerComponent,
    PaymentSpinnerComponent,

    NavComponent,
    CartComponent,
    FooterComponent,
    
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,

    NgbModule.forRoot().ngModule,    
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    CommonModule,
    
    RouterModule,
    LazyLoadImageModule
    
  ],

  providers : [
    CartService,
    AdminService,
    ReviewsService,
    MessagingService,
    ShippingService,
    MenuService,
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ItemsService,
    ShoppingCartService,
    OrderService,
    PaymentGatewayService,
    NotifyService
    
  ]
})
export class SharedModule { }
