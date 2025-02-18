import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
totalOrders:number=100;
totalProducts:number=50;
totalBrands:number=10;

  constructor(public brandService:BrandService,
    public orderService:OrderService,
    public productService:ProductService
  ) { }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(result=>this.totalBrands=result.length);
    this.orderService.getOrders().subscribe(result=>this.totalOrders=result.length);
    this.productService.getProducts().subscribe(result=>this.totalProducts=result.length);

  }

}
