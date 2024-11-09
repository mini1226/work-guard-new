import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth/auth.service";
import {SweetalertService} from "../../../shared/sweetalert/sweetalert.service";
import { jwtDecode } from 'jwt-decode';


interface CustomJwtPayload {
  id: string;
  sub: string;  // Assuming sub is the email
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  public routes = routes;

  userForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
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


  login() {
    if (this.userForm.valid) {
      this.authService.logUser(this.userForm.value).subscribe(
        (response: any) => {
          const token = response.access_token;
          console.log('Decoded token:', jwtDecode(token));  // Log the decoded token

          // Decode the token to extract user info (id, email, etc.)
          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          const userId = decodedToken.id;
          const userEmail = decodedToken.sub || '';  // Fallback to empty string if undefined

          // Set the user id and email in local storage
          localStorage.setItem('userId', userId);
          localStorage.setItem('userEmail', userEmail);

          // Optionally log the stored values to confirm
          console.log('User ID stored:', localStorage.getItem('userId'));
          console.log('User Email stored:', localStorage.getItem('userEmail'));

          // Navigate to the dashboard upon successful login
          this.router.navigate([routes.adminDashboard]);

          // Reset the form after successful submission
          this.userForm.reset();
        },
        (error) => {
          // Handle error, for example, show a popup or log the error
          console.error('Login failed', error);
          this.alertService.authenticationFailedPopup();
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
