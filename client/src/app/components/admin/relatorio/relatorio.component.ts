import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChamadoInterface } from '../../utils/interfaces/chamados/chamado.interface';
import { CoordenadorDominioInterface } from '../../utils/interfaces/dominios/coordenador-dominio.interface';
import { UtilsService } from '../../utils/services/utils.service';
import { CoordenadorRepositoryService } from '../../utils/repository/coordenador.repository.service';
import { ChamadosRepositoryService } from '../../utils/repository/chamados.repository.service';

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
  notFound: boolean = false;

  constructor(
    private coordenadorRepository: CoordenadorRepositoryService,
    private chamadosRepository: ChamadosRepositoryService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.coordenadorRepository
      .getAllCoordenadores()
      .subscribe((res: Array<CoordenadorDominioInterface>) => {
        this.coordenadoresList = res;
        this.coordenadoresDominio = res;
      });
    this.carregarChamados();

    this.utilsService.getCoordenadores().subscribe(() => {
      this.coordenadorRepository
        .getAllCoordenadores()
        .subscribe((res: Array<CoordenadorDominioInterface>) => {
          this.coordenadoresDominio = res;
        });
    });
  }

  async carregarChamados() {
    await this.chamadosRepository.getAllChamados().subscribe((res: any) => {
      this.chamadosList = res.result.filter((e: any) => e.status == 2);
      this.montarRelatorio();
    });
  }

  // prettier-ignore
  montarRelatorio() {
    let listaReports: Array<ChamadoInterface> = [];
    this.chamadosList.forEach((element: any) => {
      let coordenador = this.coordenadoresList.filter((e: any) => e.id == element.coordenador)[0]?.nome;

      let registro = new Date(element.data_registro);
      let registroFormatado = moment(`${registro.getDate()}-${registro.getMonth() + 1}-${registro.getFullYear()} ${registro.getHours()}:${registro.getMinutes()}`,'DD/M/YYYY hh:mm').format('DD/MM/YYYY H:mm');
      let conclusaoFormatada = moment(new Date(element.data_conclusao), 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY H:mm');
      let conclusaoInMinutes = moment(new Date(element.data_conclusao), 'DD/MM/YYYY hs:mm').diff(moment( registro, 'DD/MM/YYYY hs:mm'), 'minutes');
      let conclusaoInHours = moment().startOf('day').add({minutes: 90}).format('H:mm');

      element.tempo_conclusao = conclusaoInMinutes <= 60 ? conclusaoInMinutes : conclusaoInHours;
      element.data_registro = registroFormatado;
      element.data_conclusao = conclusaoFormatada;
      listaReports.push({ coordenador_nome: coordenador, ...element });

    });
    this.relatorioList = listaReports;

    return listaReports.length === 0 ? this.notFound = true : this.notFound = false;
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
    this.coordenadorRepository.getByIdCoordenadores(value).subscribe((res) => {
      this.relatorioList = this.relatorioList.filter(
        (e: any) => e.coordenador_nome == res.result.coordenador[0].nome
      );
    });
  }
}
