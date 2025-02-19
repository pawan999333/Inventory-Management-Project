import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandFormComponent } from './components/brands/brand-form/brand-form.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  {path:'',
    component:HomeComponent
  },
  {
    path:'brands',
    component:BrandsComponent
  },
  {
    path:'brands/add',
    component:BrandFormComponent
  },
  {
    path:'brands/:id',
    component:BrandFormComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'products/add',
    component:ProductFormComponent
  },
  {
    path:'products/:id',
    component:ProductFormComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path:'orders/add',
    component:OrderFormComponent
  },
  {
    path:'orders/:id',
    component:OrderFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
