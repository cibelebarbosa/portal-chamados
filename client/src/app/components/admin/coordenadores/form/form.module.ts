import { NgxMaskModule } from 'ngx-mask';
import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayMsgModule } from 'src/app/components/shared/overlay-msg/overlay-msg.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forChild(),
    OverlayMsgModule,
  ],
  exports: [FormComponent],
})
export class FormModule {}
