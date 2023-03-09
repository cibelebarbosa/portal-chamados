import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModal } from './components/modal/app-modal.component';
import { AppModalModule } from './components/modal/app-modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
