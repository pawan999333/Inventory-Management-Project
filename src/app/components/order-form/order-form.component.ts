import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import Order from 'src/app/types/order';
import product from 'src/app/types/product';
import Product from 'src/app/types/product';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
order!:Order;
  constructor(public route:ActivatedRoute,public formbuilder:FormBuilder, public router:Router, public productService:ProductService,
    public orderService:OrderService,public toaster:ToastrService
  ) { }
  orderForm=this.formbuilder.group({
    orderNo:'',
    productId:'',
    quantity:null,
    salePrice:null,
    discount:null,
    totalAmount:null
  })
products:Product[]=[];
  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    if(id){
      this.orderService.getOrder(id).subscribe((result)=>{
        this.order=result
        this.orderForm.patchValue(this.order);
        this.productService.getProducts().subscribe(result=>{
          this.products=result;
          this.selectedProduct=this.products.find((x)=>x.id==this.order.productId)
          this.orderForm.controls.productId.disable();
        })

    });
    }else{
      this.productService.getProducts().subscribe(result=>{
        this.products=result;
        this.selectedProduct=this.products.find((x)=>x.id==this.order.productId)
      })
    }
    this.orderForm.controls.orderNo.addValidators(Validators.required);
    this.orderForm.controls.productId.addValidators(Validators.required);
    this.orderForm.controls.quantity.addValidators(Validators.required);


    this.updateTotalAmount();
  }

  addOrder(){
    if(this.orderForm.invalid){
      this.toaster.error("Please provide all details");
      return;
    }
    let formValue=this.orderForm.getRawValue() as Order;
    if(formValue!.quantity! > this.selectedProduct!.availableQuantity){
      this.toaster.error("Only " + this.selectedProduct?.availableQuantity + " unit is left in inventory");
      return;
    }
    console.log(this.orderForm.value);
    this.orderService.addOrder(formValue).subscribe(()=>{
      this.selectedProduct!.availableQuantity -= formValue.quantity!
      this.productService.updateProduct(this.selectedProduct!.id!,this.selectedProduct!).subscribe()
      this.toaster.success("Your order added successfully");
      this.router.navigateByUrl('/orders')
    })
  }

  updateTotalAmount(){
    this.orderForm.valueChanges.subscribe(()=>{
      this.orderForm.controls.totalAmount.enable({emitEvent:false})
      if(this.orderForm.getRawValue().productId && this.orderForm.value.quantity){
        let total=this.selectedProduct?.salePrice! * this.orderForm.value.quantity - (this.orderForm.value.discount || 0);
        this.orderForm.controls.totalAmount.setValue(total,{
          emitEvent:false
        })
      }
      this.orderForm.controls.totalAmount.disable({emitEvent:false})
    })
  }
  selectedProduct?:Product;
  productSelected(productId:any){
    console.log(productId);
    this.selectedProduct=this.products.find(x=>x.id==productId);
    this.orderForm.controls.salePrice.enable();
    this.orderForm.controls.salePrice.setValue(this.selectedProduct?.salePrice);
    this.orderForm.controls.salePrice.disable();



  }
  updateOrder(){
    if(this.orderForm.invalid){
      this.toaster.error("Please provide all details");
      return;
    }
    let formValue=this.orderForm.getRawValue() as Order;
    if(formValue!.quantity! > this.selectedProduct!.availableQuantity + this.order.quantity!){
      this.toaster.error("Only " + this.selectedProduct?.availableQuantity + " unit is left in inventory");
      return;
    }
    this.orderService.updateOrder(this.order.id!,formValue).subscribe(()=>{
      this.selectedProduct!.availableQuantity -= (formValue.quantity! - this.order.quantity!)
      this.productService.updateProduct(this.selectedProduct!.id!,this.selectedProduct!).subscribe()
      this.toaster.success("Your order updated successfully");
      this.router.navigateByUrl('/orders')
    })
  }
}
