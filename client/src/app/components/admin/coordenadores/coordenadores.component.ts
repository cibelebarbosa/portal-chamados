import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-coordenadores',
  templateUrl: './coordenadores.component.html',
  styleUrls: ['./coordenadores.component.scss'],
})
export class CoordenadoresComponent implements OnInit {
  @ViewChild(FormComponent, { static: true }) child!: FormComponent;
  resetForm = false;
  ngOnInit(): void {}

  metodo(event: any) {
    this.child.resetarForm();
    this.child.edicao = false;
  }
}
