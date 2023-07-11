import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayMsgComponent } from './overlay-msg.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [OverlayMsgComponent],
  exports: [OverlayMsgComponent]
})
export class OverlayMsgModule { }
