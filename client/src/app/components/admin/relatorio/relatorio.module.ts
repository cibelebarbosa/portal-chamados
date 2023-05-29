import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioComponent } from './relatorio.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RelatorioComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [RelatorioComponent],
})
export class RelatorioModule {}
