import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-chamados',
  templateUrl: './perfil-chamados.component.html',
  styleUrls: ['./perfil-chamados.component.scss'],
})
export class PerfilChamadosComponent {
  @Input() coordenadores: any = [];
}
