import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Order from '../types/order';

import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(public httpClient:HttpClient) { }

    getOrders(){
         return this.httpClient.get<Order[]>(environment.apiUrl + '/orders')
    }
    getOrder(id:string){
      return this.httpClient.get<Order>(environment.apiUrl + '/orders/' +id)
 }

    addOrder(order:Order){
      return this.httpClient.post<Order>(environment.apiUrl + '/orders' , order)
 }
 updateOrder(id:string,order:Order){
  return this.httpClient.put<Order>(environment.apiUrl + '/orders/' + id , order)
}
 deleteOrder(id:string){
  return this.httpClient.delete(environment.apiUrl + '/orders/' + id )

 }
}
