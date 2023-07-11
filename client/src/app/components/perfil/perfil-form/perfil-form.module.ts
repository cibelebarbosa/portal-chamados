import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilFormComponent } from './perfil-form.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { OverlayMsgModule } from '../../shared/overlay-msg/overlay-msg.module';

@NgModule({
  declarations: [PerfilFormComponent],
  imports: [CommonModule, MaterialModule, BrowserModule, ReactiveFormsModule, NgxMaskModule.forChild(), OverlayMsgModule],
  exports: [PerfilFormComponent],
})
export class PerfilFormModule {}
