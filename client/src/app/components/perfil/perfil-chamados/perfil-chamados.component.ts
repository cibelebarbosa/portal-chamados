import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil-chamados',
  templateUrl: './perfil-chamados.component.html',
  styleUrls: ['./perfil-chamados.component.scss'],
})
export class PerfilChamadosComponent {
  @Input() coordenadores: any = [];
  dataAtual = `${moment().format('dddd')}, ${moment().format('LLL')}`
}
