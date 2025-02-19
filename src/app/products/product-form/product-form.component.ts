import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import Brand from 'src/app/types/brand';
import Product from 'src/app/types/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
brands:Brand[]=[];
product!:Product;
  constructor(public toaster:ToastrService,public builder:FormBuilder,public route:ActivatedRoute,public router:Router, public brandService:BrandService, public productService:ProductService) { }

  productForm:FormGroup=this.builder.group({
    name:['',[Validators.required]],
    details:[''],
    brandId:['',[Validators.required]],
    purchasePrice:['',[Validators.required]],
    salePrice:['',[Validators.required]],
    availableQuantity:['',[Validators.required]]

  })

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    this.brandService.getBrands().subscribe((result)=> (this.brands=result));
    if(id){
      this.productService.getProduct(id).subscribe(result=>{
        this.product=result;
        this.productForm.patchValue(this.product);
      })
    }

  }

  addProduct(){
    console.log(this.productForm.value);
    if(this.productForm.invalid){
      this.toaster.error("please provide all the details");
      return;
    }
    let product=this.productForm.value;
    this.productService.addProduct(product).subscribe(result=>{
      this.toaster.success("Product added successfully");
      this.router.navigateByUrl('/products');
    })
  }

  updateProduct(){
    if(this.productForm.invalid){
      this.toaster.error("please provide all the details");
      return;
    }
    let product=this.productForm.value;
    this.productService.updateProduct(this.product.id,product).subscribe(result=>{
      this.toaster.success("Product updated successfully");
      this.router.navigateByUrl('/products');
    })
  }
}
