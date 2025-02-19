import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import Order from 'src/app/types/order';
import Product from 'src/app/types/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 dataSource!:MatTableDataSource<Order>;
 orders:Order[]=[];
 products:Product[]=[];
//  title:string='pawan';
 displayedColumns = [
  "orderNo",
      "productId",
      "quantity",
      "salePrice",
      "discount",
      "totalAmount",
  'action'

 ]
 @ViewChild(MatPaginator) pagination!:MatPaginator
   @ViewChild(MatSort) sort!:MatSort;
  constructor(public orderService:OrderService, public productService:ProductService, public toaster:ToastrService) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(result=>this.products=result);
    this.orderService.getOrders().subscribe(result=>{
      this.orders=result;
      this.initTable();
  });
  }
  initTable(){
    this.dataSource=new MatTableDataSource(this.orders);
    this.dataSource.paginator=this.pagination;
    this.dataSource.sort=this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.pagination.firstPage();
  }

  getProductName(id:string){

    return this.products.find(x=>x.id==id)?.name;
  }

  cancelOrder(order:Order){
    this.orderService.deleteOrder(order.id!).subscribe(()=>{
      this.toaster.success("Order cancelled");
      this.productService.getProduct(order.productId!).subscribe((product)=>{
        product.availableQuantity = (+product.availableQuantity) + (+ order.quantity!);

        this.productService.updateProduct(product.id!,product!).subscribe()

      });
      this.orders=this.orders.filter((x)=>x.id!=order.id);
      this.dataSource.data=this.orders
    })

  }
}
