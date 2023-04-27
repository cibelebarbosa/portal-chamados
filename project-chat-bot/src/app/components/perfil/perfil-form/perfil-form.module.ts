import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilFormComponent } from './perfil-form.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PerfilFormComponent],
  imports: [CommonModule, MaterialModule, BrowserModule, ReactiveFormsModule],
  exports: [PerfilFormComponent],
})
export class PerfilFormModule {}
