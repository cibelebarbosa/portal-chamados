import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CoordenadorRepositoryService } from '../utils/repository/coordenador.repository.service';
import { UtilsService } from '../utils/services/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './app-perfil.component.html',
  styleUrls: ['./app-perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  coordenadores: any = [];

  constructor(
    private coordenadorRepository: CoordenadorRepositoryService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.getCoordenadoresByEscala();
    this.utilsService.getCoordenadores().subscribe(() => {
      this.getCoordenadoresByEscala();
    });
  }

  getCoordenadoresByEscala() {
    let coordByDia = [];
    const setCoordenadores = new Set();
    moment.locale('pt-br');
    // prettier-ignore
    this.coordenadorRepository.getAllCoordenadoresByFilters(moment().format('dddd').toLowerCase()).subscribe((res) => {
      coordByDia = res.filter((e: any)=> e.horaInicio <= moment().format('LT') && e.horaFim >= moment().format('LT'));
      const coordenadoresFiltrados = coordByDia.filter((e: any) => {
        const duplicatedCoord = setCoordenadores.has(e.id);
        setCoordenadores.add(e.id);
        return !duplicatedCoord;
      });
      this.coordenadores = coordenadoresFiltrados;
    });
  }
}
