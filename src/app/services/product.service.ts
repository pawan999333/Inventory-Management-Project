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

      getProduct(id:string){
        return this.httpClient.get<Product>(environment.apiUrl + "/products/" + id);
     }
     updateProduct(id:string, product:Product){
      return this.httpClient.put<Product>(environment.apiUrl + "/products/" + id, product);
 }
      addProduct(product:Product){
        return this.httpClient.post<Product[]>(environment.apiUrl + "/products", product)
      }
}
