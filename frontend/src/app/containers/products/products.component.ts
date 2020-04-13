import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products;
  public categories;
  public product = { id: 0, name: '', reference: '', price: 0, image: '', CategoryId: '' }
  public message: string;
  public validateForm: FormGroup;

  constructor(public productService: ProductService,
    public categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService) { }

    ngOnInit(): void {
      this.getAll();
  }
  getAll() {
    this.productService.getAll()
      .subscribe(res => { this.products = res; },
        error => console.error(error));
  }
}
