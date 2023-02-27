import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SelectedProductsComponent } from './components/selected-products/selected-products.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchComponent,
    CategoryComponent,
    ProductDetailsComponent,
    CartComponent,
    SelectedProductsComponent,
    CheckoutFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
