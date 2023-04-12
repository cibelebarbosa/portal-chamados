import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppForm } from './app-form.component';


@NgModule({
  declarations: [
    AppForm
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppFormModule],
  exports: [AppForm]
})
export class AppFormModule { }
