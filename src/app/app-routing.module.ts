import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SelectedProductsComponent } from './components/selected-products/selected-products.component';

const routes: Routes = [
  { path: 'selected-products', component: SelectedProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:category', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
