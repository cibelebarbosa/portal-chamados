import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-coordenadores',
  templateUrl: './coordenadores.component.html',
  styleUrls: ['./coordenadores.component.scss'],
})
export class CoordenadoresComponent implements OnInit {
  @ViewChild(FormComponent, { static: true }) child!: FormComponent;
  ngOnInit(): void {}

  metodo(event: any) {
    this.child.resetarForm();
    this.child.selectValue = '';
    this.child.edicao = false;
  }
}
