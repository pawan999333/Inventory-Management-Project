import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import Product from 'src/app/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 dataSource!:MatTableDataSource<Product>;
 products:Product[]=[];
//  title:string='pawan';
 displayedColumns = [
  'name',
  'details',
  'brandId',
  'purchasePrice',
  'salePrice',
  'availableQuantity',
  'action'

 ]
 @ViewChild(MatPaginator) pagination!:MatPaginator
   @ViewChild(MatSort) sort!:MatSort;
  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(result=>{
      this.products=result;
      this.initTable();

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.pagination.firstPage();
  }
  initTable(){
    this.dataSource=new MatTableDataSource(this.products);
    this.dataSource.paginator=this.pagination;
    this.dataSource.sort=this.sort;
  }
}
