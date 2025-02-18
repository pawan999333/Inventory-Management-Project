import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import Brand from 'src/app/types/brand';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
 name!:string;
 brand!:Brand;
  constructor(public brandService:BrandService, public route:ActivatedRoute, public router:Router) { }

  ngOnInit(): void {
   const id= this.route.snapshot.params['id'];
   console.log(id);
   if(id){
    this.brandService.getBrand(id).subscribe((result)=>{
      this.brand=result;
      this.name=result.name;

    })
   }
  }

  addBrand(){
    console.log("name",this.name)
    if(!this.name){
      alert("Please enter brand name");
      return;
    }
    let brand:Brand={
      name:this.name
    }
   this.brandService.addBrand(brand).subscribe((result)=>{
    alert("Brand added successfully")
    this.router.navigateByUrl('/brands')
   })
  }

  updateBrand(){
    console.log("name",this.name)
    if(!this.name){
      alert("Please enter brand name");
      return;
    }
    let brand:Brand={
      id:this.brand.id,
      name:this.name
    }
   this.brandService.updateBrand(brand).subscribe((result)=>{
    alert("Brand updated successfully")
    this.router.navigateByUrl('/brands')
   })
  }
}
