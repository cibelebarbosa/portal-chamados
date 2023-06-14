import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/services/repository.service';
import * as moment from 'moment';
import { ChamadoInterface } from '../../shared/interfaces/chamados/chamado.interface';
import { CoordenadorDominioInterface } from '../../shared/interfaces/dominios/coordenador-dominio.interface';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent implements OnInit {
  chamadosList: Array<ChamadoInterface> = [];
  coordenadoresList: Array<CoordenadorDominioInterface> = [];
  relatorioList: Array<ChamadoInterface> = [];
  coordenadoresDominio: Array<CoordenadorDominioInterface> = [];
  coordenadorSelected: string = '';

  constructor(
    private repository: RepositoryService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.repository.getAllCoordenadores().subscribe((res: Array<CoordenadorDominioInterface>) => {
      this.coordenadoresList = res;
      this.coordenadoresDominio = res;
    });
    this.carregarChamados();

    this.utilsService.getCoordenadores().subscribe(() => {
      this.repository.getAllCoordenadores().subscribe((res: Array<CoordenadorDominioInterface>) => {
        this.coordenadoresDominio = res;
      });
    });
  }

  async carregarChamados() {
    await this.repository.getAll().subscribe((res: any) => {
      this.chamadosList = res.result.filter((e: any) => e.status == 2);
      this.montarRelatorio();
    });
  }

  montarRelatorio() {
    let listaReports: Array<ChamadoInterface> = [];
    this.chamadosList.forEach((element: any) => {
      let coordenador = this.coordenadoresList.filter(
        (e: any) => e.id == element.coordenador
      )[0].nome;

      let registro = new Date(element.data_registro);
      let registroFormatado = moment(
        `${registro.getDate()}-${
          registro.getMonth() + 1
        }-${registro.getFullYear()} ${registro.getHours()}:${registro.getMinutes()}`,
        'DD/M/YYYY hh:mm'
      ).format('DD/MM/YYYY H:mm');
      let conclusaoFormatada = moment(
        new Date(element.data_conclusao),
        'YYYY-MM-DD hh:mm:ss'
      ).format('DD/MM/YYYY H:mm');

      element.tempo_conclusao = moment(
        new Date(element.data_conclusao),
        'DD/MM/YYYY hs:mm'
      ).diff(moment( registro, 'DD/MM/YYYY hs:mm'), 'minutes');
      element.data_registro = registroFormatado;
      element.data_conclusao = conclusaoFormatada;

      listaReports.push({ coordenador_nome: coordenador, ...element });

    });
    this.relatorioList = listaReports;
  }

  removerFiltros() {
    this.relatorioList = [];
    this.carregarChamados();
    this.coordenadorSelected = '';
  }

  getById(value: any) {
    this.relatorioList = [];
    this.carregarChamados();
    if (this.coordenadorSelected === '') return;
    this.repository.getByIdCoordenadores(value).subscribe((res) => {
      this.relatorioList = this.relatorioList.filter(
        (e: any) => e.coordenador_nome == res.result.coordenador[0].nome
      );
    });
  }
}
