import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './app-footer.component';


@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [FooterComponent]
})
export class FooterModule { }
