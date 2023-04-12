import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './app-navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [NavbarComponent]
})
export class NavbarModule { }
