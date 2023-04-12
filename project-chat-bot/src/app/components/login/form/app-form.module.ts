import { NavbarModule } from './../../shared/navbar/app-navbar.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginFormComponent } from './app-form.component';


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
