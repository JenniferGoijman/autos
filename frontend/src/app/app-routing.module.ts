import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/user/login/login.component';
import { RegisterComponent } from './containers/user/register/register.component';
import { AdminProductsComponent } from './containers/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './containers/admin-categories/admin-categories.component';
import { ProductsComponent } from './containers/products/products.component';
import { AdminOrdersComponent } from './containers/admin-orders/admin-orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/categories', component: AdminCategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
