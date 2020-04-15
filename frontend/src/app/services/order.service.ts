import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('http://localhost:3000/orders')
  }
}
