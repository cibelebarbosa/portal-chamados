import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './app-navbar.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [BrowserModule, CommonModule, MaterialModule],
  providers: [],
  bootstrap: [],
  exports: [NavbarComponent],
})
export class NavbarModule {}
