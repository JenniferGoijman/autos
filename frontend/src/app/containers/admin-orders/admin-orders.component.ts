import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public orders;
  public validateForm: FormGroup;
  public router: Router;

  constructor(public orderService: OrderService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAll()

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  getAll() {
    this.orderService.getAll()
      .subscribe(res => { this.orders = res; },
        error => console.error(error));
  }

}
