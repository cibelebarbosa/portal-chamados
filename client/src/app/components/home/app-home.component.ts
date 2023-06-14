import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';
import { TranslationService } from '../shared/services/translate.service';
import { FiltroService } from '../shared/services/filter.service';
import { ChamadoInterface } from '../shared/interfaces/chamados/chamado.interface';
import { UtilsService } from '../shared/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
})
export class HomeComponent implements OnInit {
  chamadosList: Array<ChamadoInterface> = [];

  constructor(
    private repository: RepositoryService,
    public translate: TranslationService,
    private filtro: FiltroService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.carregarLista();
    this.filtro.getConcluido().subscribe((data) => {
      this.carregarLista();
    });
    this.utilsService.getChamados().subscribe((data) => {
      this.carregarLista();
    });

  }

  carregarLista() {
    let chamadosAbertos: Array<ChamadoInterface> = [];
    this.repository.getAll().subscribe((res) => {
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
