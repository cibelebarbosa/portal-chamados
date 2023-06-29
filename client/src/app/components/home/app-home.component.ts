import { Component, OnInit } from '@angular/core';
import { ChamadosRepositoryService} from '../utils/repository/chamados.repository.service';
import { TranslationService } from '../utils/services/translate.service';
import { FiltroService } from '../utils/services/filter.service';
import { ChamadoInterface } from '../utils/interfaces/chamados/chamado.interface';
import { UtilsService } from '../utils/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
})
export class HomeComponent implements OnInit {
  chamadosList: Array<ChamadoInterface> = [];

  constructor(
    private chamadosRepository: ChamadosRepositoryService,
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
    this.chamadosRepository.getAllChamados().subscribe((res) => {
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
