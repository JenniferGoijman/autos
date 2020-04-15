import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  public categories;
  public category = { id: 0, name: '' }
  public validateForm: FormGroup;
  public router: Router;
  public message: string;

  constructor(public categoryService: CategoryService,private fb: FormBuilder,private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getAll()

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  getAll() {
    this.categoryService.getAll()
      .subscribe(res => { this.categories = res; },
        error => console.error(error));
  }

  deleteCategory(categoryId) {
    this.categoryService.delete(categoryId)
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

  editCategory(category) {
    this.validateForm = this.fb.group({ name: [category.name, [Validators.required]] })
    this.category.id = category.id;
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.category.name = this.validateForm.value.name;
      if (this.category.id != 0) {
        this.categoryService.update(this.category)
          .subscribe(
            (res: HttpResponse<object>) => {
              this.notification.success('Categoria modificada con éxito', res['message']);
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.notification.error('Problema al modificar la categoria', error['error']['message']);
            }
          )
      } else {
        this.categoryService.insert(this.category)
          .subscribe(
            (res: HttpResponse<object>) => {
              this.notification.success('Categoria creado con éxito', res['message']);
              this.getAll();
            },
            (error: HttpErrorResponse) => {
              this.notification.error('Problema al crear la categoria', error['error']['message']);
            }
          )
      }
      this.validateForm.reset();
    }
  }
}
