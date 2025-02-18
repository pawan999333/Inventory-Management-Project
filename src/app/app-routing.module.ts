import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandFormComponent } from './components/brands/brand-form/brand-form.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
