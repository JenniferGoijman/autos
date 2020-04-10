import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  public categories;
  public validateForm: FormGroup;
  constructor(public categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.categoryService.getAll()
      .subscribe(res => { this.categories = res; },
        error => console.error(error));
  }

  deleteCategory(categoryId){}
  submitForm(){}
}
