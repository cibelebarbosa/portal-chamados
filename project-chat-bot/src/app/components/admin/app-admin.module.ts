import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { AdminComponent } from './app-admin.component';
import { ChamadosModule } from './chamados/app-chamados.module';
import { FooterModule } from '../shared/footer/app-footer.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [BrowserModule, CommonModule, NavbarModule, ChamadosModule, FooterModule, MaterialModule],
  providers: [],
  bootstrap: [AdminComponent],
  exports: [AdminComponent],
})
export class AdminModule {}
