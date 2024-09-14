import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { sharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin/signin.component';
import {RegisterComponent} from "./register/register/register.component";



@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    sharedModule
  ]
})
export class AuthModule { }
