import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'coordenador',
  templateUrl: './coordenador.component.html',
  styleUrls: ['./coordenador.component.scss'],
})
export class CoordenadorComponent implements OnInit {
  coordenadorId = 0;

  constructor(
    private filtro: FiltroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.coordenadorId =
      parseInt(this.route.snapshot.paramMap.get('id') ?? '0') ?? 0;
  }

  filtrarLista(status: number) {
    this.filtro.setLista(status);
  }
}
