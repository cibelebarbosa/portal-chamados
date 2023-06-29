import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';
import { UtilsService } from '../../utils/services/utils.service';

@Component({
  selector: 'app-coordenadores',
  templateUrl: './coordenadores.component.html',
  styleUrls: ['./coordenadores.component.scss'],
})
export class CoordenadoresComponent implements OnInit {
  @ViewChild(FormComponent, { static: true }) child!: FormComponent;
  constructor(private utilsService: UtilsService,){}

  ngOnInit(): void {}

  metodo(event: any) {
    this.utilsService.setToggle(false);
  }
}
