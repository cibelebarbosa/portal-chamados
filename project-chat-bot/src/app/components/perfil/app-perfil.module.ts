import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { FooterModule } from '../shared/footer/app-footer.module';
import { AppModalModule } from '../chat-modal/modal/app-modal.module';
import { PerfilComponent } from './app-perfil.component';

@NgModule({
  declarations: [PerfilComponent],
  imports: [BrowserModule, CommonModule, NavbarModule, FooterModule, AppModalModule],
  providers: [],
  bootstrap: [PerfilComponent],
  exports: [PerfilComponent],
})
export class PerfilModule {}
