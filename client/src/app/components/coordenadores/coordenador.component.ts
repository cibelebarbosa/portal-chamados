import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'coordenador',
  templateUrl: './coordenador.component.html',
  styleUrls: ['./coordenador.component.scss'],
})
export class CoordenadorComponent implements OnInit {

  constructor(private filtro: FiltroService, private router: Router) {}

  ngOnInit() {
    if(sessionStorage.getItem('canAccess') != 'true'){
      this.router.navigate(['/login'])
    }
  }

  filtrarLista(status: number) {
    this.filtro.setLista(status);
  }
}
