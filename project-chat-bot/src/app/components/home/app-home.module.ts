import { NavbarModule } from '../shared/navbar/app-navbar.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModalModule } from '../chat-modal/modal/app-modal.module';
import { HomeComponent } from './app-home.component';
import { FooterModule } from '../shared/footer/app-footer.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [BrowserModule, CommonModule, AppModalModule, NavbarModule, FooterModule],
  providers: [],
  bootstrap: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
