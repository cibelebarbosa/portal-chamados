import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { LoginComponent } from './app-login.component';
import { LoginFormModule } from './form/app-form.module';
import { FooterModule } from '../shared/footer/app-footer.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [BrowserModule, CommonModule, NavbarModule, LoginFormModule, FooterModule],
  providers: [],
  bootstrap: [LoginComponent],
  exports: [LoginComponent],
})
export class AppLoginFormModule {}
