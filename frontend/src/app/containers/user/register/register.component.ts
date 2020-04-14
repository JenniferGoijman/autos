import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  public successMsg:string;
  public errorMsg:string;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      //this.validateForm.controls[i].updateValueAndValidity();
    }
      if(this.validateForm.valid){
        const user =this.validateForm.value;
        this.userService.signup(user)
        .subscribe(
          (res:HttpResponse<object>)=>{
            this.successMsg=res['message'];
            setTimeout(() => {
              this.router.navigate(['login'])
            }, 2000);
          },
          (error:HttpErrorResponse)=>{
            this.errorMsg=error['error']['message'];
            setTimeout(() =>  this.errorMsg="" , 2000);
          }
        )
    }
  }
  
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public router:Router
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      agree: [false]
    });
  }
}
