import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Product from '../types/product';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public httpClient:HttpClient) { }

      getProducts(){
           return this.httpClient.get<Product[]>(environment.apiUrl + "/products")
      }
}
