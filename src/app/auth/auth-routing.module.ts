import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin/signin.component';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'signin',
        component: SigninComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
