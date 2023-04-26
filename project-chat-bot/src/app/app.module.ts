import { NavbarModule } from './components/shared/navbar/app-navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/app-home.module';
import { AppLoginFormModule } from './components/login/app-login.module';
import { AdminModule } from './components/admin/app-admin.module';
import { FooterModule } from './components/shared/footer/app-footer.module';
import { PerfilModule } from './components/perfil/app-perfil.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    AppLoginFormModule,
    AdminModule,
    FooterModule, PerfilModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
