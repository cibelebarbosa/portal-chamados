import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from './app-modal.component';
import { AppFormModule } from '../../chat-modal/form/app-form.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [BrowserModule, CommonModule, AppFormModule, FormsModule],
  providers: [],
  bootstrap: [ModalModule],
  exports: [ModalComponent],
})
export class ModalModule {}
