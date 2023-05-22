import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { AdminComponent } from './app-admin.component';
import { ChamadosModule } from './chamados/app-chamados.module';
import { FooterModule } from '../shared/footer/app-footer.module';
import { MaterialModule } from 'src/app/material.module';
import { CoordenadoresModule } from './coordenadores/coordenadores.module';
import { CursosComponent } from './cursos/cursos.component';
import { CursosModule } from './cursos/cursos.module';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioModule } from './relatorio/relatorio.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NavbarModule,
    ChamadosModule,
    FooterModule,
    MaterialModule,
    CoordenadoresModule,
    CursosModule,
    RelatorioModule
  ],
  providers: [],
  bootstrap: [AdminComponent],
  exports: [AdminComponent],
})
export class AdminModule {}
