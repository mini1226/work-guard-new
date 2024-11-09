import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth/auth.service";
import {SweetalertService} from "../../../shared/sweetalert/sweetalert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})



export class RegisterComponent implements OnInit{
  public routes = routes;
  public password: boolean[] = [false, false, false];  // Adjusted for password toggle

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  }, );

  constructor(private router: Router,
              private authService: AuthService,
              private alertService: SweetalertService,) {
  }



  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  navigation() {
    this.router.navigate([routes.signIn]);
  }


  addUser() {
    if (this.userForm.valid) {
      this.authService.regUser(this.userForm.value).subscribe(
        (response: any) => {
          this.alertService.saveBtn();
          // this.router.navigate([routes.signIn]);
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

  ngOnInit(): void {
    this.authService.test().subscribe(value => {
      console.log(value);
    })

  }



}

