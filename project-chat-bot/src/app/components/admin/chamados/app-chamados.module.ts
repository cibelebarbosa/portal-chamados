import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../../shared/navbar/app-navbar.module';
import { ChamadosComponent } from './app-chamados.component';
import { ModalModule } from '../modal/app-modal.module';

@NgModule({
  declarations: [ChamadosComponent],
  imports: [BrowserModule, CommonModule, NavbarModule, ModalModule],
  providers: [],
  bootstrap: [ChamadosComponent],
  exports: [ChamadosComponent],
})
export class ChamadosModule {}
