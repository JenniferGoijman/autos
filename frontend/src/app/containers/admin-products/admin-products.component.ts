import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
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
    this.categoriesGetAll();

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      reference: [null, [Validators.required]],
      price: [0, [Validators.required]],
      image: [null],
      CategoryId: [null, [Validators.required]]
    });
  }

  getAll() {
    this.productService.getAll()
      .subscribe(res => { this.products = res; },
        error => console.error(error));
  }

  categoriesGetAll() {
    this.categoryService.getAll()
      .subscribe(res => { this.categories = res; },
        error => console.error(error));
  }

  deleteProduct(productId) {
    this.productService.delete(productId)
      .subscribe(res => {
        this.message = res.message;
        setTimeout(() => this.message = "", 2500);
        this.getAll();
      },
        error => {
          console.log(error);
          this.message = error.message;
          setTimeout(() => this.message = "", 2500);
        }
      )
  }

  editProduct(product) {
    this.validateForm = this.fb.group({ 
      name: [product.name, [Validators.required]],
      reference: [product.reference, [Validators.required]],
      price: [product.price, [Validators.required]],
      image: [product.image, ],
      CategoryId: [product.Category.id, [Validators.required]]
    })
    this.product.id = product.id;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.product.name = this.validateForm.value.name;
      this.product.reference = this.validateForm.value.reference;
      this.product.price = this.validateForm.value.price;
      this.product.image = this.validateForm.value.image;
      this.product.CategoryId = this.validateForm.value.CategoryId;
      if (this.product.id != 0) {
        console.log(this.product)
        this.productService.update(this.product)
          .subscribe(
            (res: HttpResponse<object>) => {
              this.notification.success('Producto modificado con éxito', res['message']);
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.notification.error('Problema al modificar el producto', error['error']['message']);
            }
          )
      } else {
        this.productService.insert(this.validateForm.value)
          .subscribe(
            (res: HttpResponse<object>) => {
              this.notification.success('Producto creado con éxito', res['message']);
              this.getAll();
              // setTimeout(() => {this.router.navigate(['login'])}, 2500);
            },
            (error: HttpErrorResponse) => {
              this.notification.error('Problema al crear el producto', error['error']['message']);
            }
          )
      }
      this.validateForm.reset();
    }
  }
}