import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import Brand from 'src/app/types/brand';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  dataSource!:MatTableDataSource<Brand>;
  displayedColumns:string[]=['name','action']
  @ViewChild(MatPaginator) pagination!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort;
  constructor(public brandService:BrandService) { }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(result=>{
      this.initTable(result);
    })
  }

  initTable(data:Brand[]){
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator=this.pagination;
    this.dataSource.sort=this.sort;
  }
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

}
