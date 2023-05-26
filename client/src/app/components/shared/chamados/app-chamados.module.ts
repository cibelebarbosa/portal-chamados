import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../navbar/app-navbar.module';
import { ChamadosComponent } from './app-chamados.component';
import { ModalModule } from '../../admin/modal/app-modal.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ChamadosComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NavbarModule,
    ModalModule,
    DatePipe,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ChamadosComponent],
  exports: [ChamadosComponent],
})
export class ChamadosModule {}
