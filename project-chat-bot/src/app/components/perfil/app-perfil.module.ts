import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { FooterModule } from '../shared/footer/app-footer.module';
import { AppModalModule } from '../chat-modal/modal/app-modal.module';
import { PerfilComponent } from './app-perfil.component';
import { PerfilFormModule } from './perfil-form/perfil-form.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NavbarModule,
    FooterModule,
    AppModalModule,
    PerfilFormModule,
  ],
  providers: [],
  bootstrap: [PerfilComponent],
  exports: [PerfilComponent],
})
export class PerfilModule {}
