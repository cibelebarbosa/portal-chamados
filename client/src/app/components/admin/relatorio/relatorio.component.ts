import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import * as moment from 'moment';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent implements OnInit {
  chamadosList: any = [];
  coordenadoresList: any = [];
  relatorioList: any = [];
  coordenadoresDominio: any = [];
  coordenadorSelected = '';

  constructor(
    private repository: RepositoryService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.repository.getAllCoordenadores().subscribe((res: any) => {
      this.coordenadoresList = res;
    });

    this.carregarChamados();
    this.repository.getAllCoordenadores().subscribe((res) => {
      this.coordenadoresDominio = res;
    });

    this.utilsService.getCoordenadores().subscribe(() => {
      this.repository.getAllCoordenadores().subscribe((res) => {
        this.coordenadoresDominio = res;
      });
    });
  }

  async carregarChamados() {
    await this.repository.getAllPromise().then((res: any) => {
      this.chamadosList = res.result.filter((e: any) => e.status == 2);
      this.montarRelatorio();
    });
  }

  montarRelatorio() {
    let listaReports: any = [];
    this.chamadosList.forEach((element: any) => {
      let coordenador = this.coordenadoresList.filter(
        (item: any) => item.id === element.coordenador
      )[0].nome;
      let registro = new Date(element.data_registro);
      let registroFormatado = moment(
        `${registro.getDate()}-${
          registro.getMonth() + 1
        }-${registro.getFullYear()} ${registro.getHours()}:${registro.getMinutes()}`,
        'DD/M/YYYY hh:mm'
      ).format('DD/MM/YYYY hh:mm');
      let conclusaoFormatada = moment(
        element.data_conclusao,
        'YYYY-MM-DD hh:mm:ss'
      ).format('DD/MM/YYYY hh:mm');

      element.tempo_conclusao = moment(
        registroFormatado,
        'DD/MM/YYYY hs:mm'
      ).diff(moment(conclusaoFormatada, 'DD/MM/YYYY hs:mm'), 'hours');
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
    if(this.coordenadorSelected === '') return;
    this.repository.getByIdCoordenadores(value).subscribe((res) => {
      this.relatorioList = this.relatorioList.filter((e:any) => e.coordenador == res.result.coordenador[0].id)
      console.log(this.chamadosList);

    });
  }
}
