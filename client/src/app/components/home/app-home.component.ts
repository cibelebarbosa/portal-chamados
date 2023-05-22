import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { TranslationService } from '../services/translate.service';
import { FiltroService } from '../services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
})
export class HomeComponent implements OnInit {
  chamadosList: any = [];
  chamado: Array<any> = [];

  constructor(
    private repository: RepositoryService,
    public translate: TranslationService,
    private filtro: FiltroService
  ) {}

  ngOnInit() {
    this.carregarLista();
    this.filtro.getConcluido().subscribe((data) => {
      this.carregarLista();
    });
  }

  carregarLista() {
    let chamadosAbertos: any = [];
    this.repository.getAll().subscribe((res: any) => {
      res.result.forEach((e: any) => {
        if (e.status !== 2) chamadosAbertos.push(e);
      });
      this.chamadosList = chamadosAbertos;
    });
  }

  espera(date: any): string {
    let chamadoDate = new Date(date);
    let diaAtual = new Date();
    return chamadoDate
      ? diaAtual.getDate() - chamadoDate?.getDate() + ' dia(s) atrás.'
      : '';
  }
}
