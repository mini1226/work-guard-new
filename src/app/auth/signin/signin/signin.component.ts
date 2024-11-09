import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth/auth.service";
import {SweetalertService} from "../../../shared/sweetalert/sweetalert.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  public routes = routes;

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  }, );


  constructor(private router: Router,private authService: AuthService,
              private alertService: SweetalertService,) {}

  navigation() {
    this.router.navigate([routes.adminDashboard])
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }


  login(){
    if (this.userForm.valid) {
      this.authService.logUser(this.userForm.value).subscribe(
        (response: any) => {
          this.router.navigate([routes.adminDashboard]);
          this.userForm.reset();
        }
      );
    } else {
      this.alertService.errorPopup();
      // Log invalid form controls and their errors
      Object.keys(this.userForm.controls).forEach(controlName => {
        const control = this.userForm.get(controlName);
        if (control?.invalid) {
          console.log(`Invalid control: ${controlName}`, control.errors);
          control.markAsTouched();
        }
      });
    }
  }

}
