import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../services/filter.service';
@Component({
  selector: 'app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.scss'],
})
export class AdminComponent implements OnInit {
  conteudo = 0;
  showFiller = false;
  constructor(private filtro: FiltroService) {}

  ngOnInit() {}

  filtrarLista(status: number) {
    this.filtro.setLista(status);
  }

}
