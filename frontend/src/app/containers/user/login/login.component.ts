import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  public successMsg:string;
  public errorMsg:string;


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      const user =this.validateForm.value;
      this.userService.login(user)
      .subscribe(
        (res:HttpResponse<object>)=>{
          this.notification.success('Usuario logueado con éxito', res['message']);
          this.userService.setUser(res['user']);
          this.userService.setToken(res['token']);
          localStorage.setItem('authToken', res['token']);
          setTimeout(() => {
            this.router.navigate(['products'])
          }, 3000);
        },
        (error:HttpErrorResponse)=>{
          this.notification.error('Problema al loguear el usuario', error['error']['message']);
          setTimeout(() =>  this.errorMsg="" , 1500);
        }
      )
  }
  }

  constructor(private fb: FormBuilder,
    public userService: UserService,
    public router:Router,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }}
