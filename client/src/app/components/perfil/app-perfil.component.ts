import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil',
  templateUrl: './app-perfil.component.html',
  styleUrls: ['./app-perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    moment.locale('pt-br');
    let a = moment().format('LT');

    console.log(a > '18:00' && a < '22:00');

  }
}
