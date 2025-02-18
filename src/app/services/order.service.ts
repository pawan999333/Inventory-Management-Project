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
}
