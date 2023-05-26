import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { FooterModule } from '../shared/footer/app-footer.module';
import { CoordenadorComponent } from './coordenador.component';
import { MaterialModule } from 'src/app/material.module';
import { ChamadosModule } from '../shared/chamados/app-chamados.module';
import { CoordenadoresModule } from '../admin/coordenadores/coordenadores.module';
import { RelatorioModule } from '../admin/relatorio/relatorio.module';

@NgModule({
  declarations: [CoordenadorComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NavbarModule,
    ChamadosModule,
    FooterModule,
    MaterialModule,
    CoordenadoresModule,
    RelatorioModule
  ],
  providers: [],
  bootstrap: [CoordenadorComponent],
  exports: [CoordenadorComponent],
})
export class CoordenadorModule {}
