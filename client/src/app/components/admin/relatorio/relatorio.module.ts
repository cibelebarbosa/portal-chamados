import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioComponent } from './relatorio.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { PageNotFoundModule } from '../../shared/page-not-found/page-not-found.module';

@NgModule({
  declarations: [RelatorioComponent],
  imports: [CommonModule, MaterialModule, FormsModule, PageNotFoundModule],
  exports: [RelatorioComponent],
})
export class RelatorioModule {}
