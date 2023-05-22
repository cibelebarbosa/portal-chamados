import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppFormModule } from '../form/app-form.module';
import { AppModal } from './app-modal.component';


@NgModule({
  declarations: [
    AppModal
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppFormModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppModalModule],
  exports: [AppModal]
})
export class AppModalModule { }
