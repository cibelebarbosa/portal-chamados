import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordenadoresComponent } from './coordenadores.component';
import { MaterialModule } from 'src/app/material.module';
import { FormModule } from './form/form.module';

@NgModule({
  declarations: [CoordenadoresComponent],
  imports: [CommonModule, MaterialModule, FormModule],
  exports: [CoordenadoresComponent],
})
export class CoordenadoresModule {}
