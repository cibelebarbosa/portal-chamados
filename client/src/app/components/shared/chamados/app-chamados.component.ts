import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../admin/modal/app-modal.component';
import { ChamadosStatusEnum } from '../../utils/enums/chamados.enum';
import { ChamadoInterface } from '../../utils/interfaces/chamados/chamado.interface';
import { ChamadosRepositoryService } from '../../utils/repository/chamados.repository.service';
import { TranslationService } from '../../utils/services/translate.service';
import { FiltroService } from '../../utils/services/filter.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './app-chamados.component.html',
  styleUrls: ['./app-chamados.component.scss'],
})
export class ChamadosComponent implements OnInit {
  @Input() coordenadorId: number = 0;
  @ViewChild(ModalComponent, { static: true }) child!: ModalComponent;
  chamadosList: Array<ChamadoInterface> = [];
  notFound: boolean = false;

  constructor(
    private chamadosRepository: ChamadosRepositoryService,
    public translate: TranslationService,
    private filtro: FiltroService
  ) {}

  ngOnInit() {
    if (this.coordenadorId && this.coordenadorId !== 0) {
      this.carregarListaCoordenador(this.coordenadorId);
    } else {
      this.carregarLista();
    }
    this.filtro
      .getLista()
      .subscribe((data) => this.carregarListaFiltrada(data));
  }

  carregarLista() {
    this.chamadosRepository.getAllChamados().subscribe((res: any) => {
      this.chamadosList = res.result;
      this.chamadosList.length === 0 ? this.notFound = true : this.notFound = false;
    });
  }

  carregarListaCoordenador(id: number) {
    this.chamadosRepository.getAllByIdChamados(id).subscribe((res: any) => {
      this.chamadosList = res.result;
      this.chamadosList.length === 0 ? this.notFound = true : this.notFound = false;
    });
  }

  carregarListaFiltrada(data: number) {
    this.notFound = false;
    if (this.coordenadorId) {
      if (data === 3) {
        this.carregarListaCoordenador(this.coordenadorId);
        return;
      }
      this.chamadosRepository.getAllByFiltersChamados(data).subscribe((data) => {
        this.chamadosList = data.result.filter(
          (e: any) => e.coordenador == this.coordenadorId
        );
        this.chamadosList.length === 0 ? this.notFound = true : this.notFound = false;
      });
    } else {
      if (data === 3) {
        this.carregarLista();
        return;
      }
      this.chamadosRepository.getAllByFiltersChamados(data).subscribe((data) => {
        this.chamadosList = data.result;
        this.chamadosList.length === 0 ? this.notFound = true : this.notFound = false;
      });
    }
  }

  concluir(id: number, item: any) {
    this.child.openPopup(ChamadosStatusEnum.CONCLUIDO, item);
    this.filtro.setConcluido(true);
  }

  atender(id: number, item: any) {
    this.child.openPopup(ChamadosStatusEnum.EM_ATENDIMENTO, item);
  }

  espera(date: any): string {
    let chamadoDate = new Date(date);
    let diaAtual = new Date();
    return chamadoDate
      ?  diaAtual.getDate() - chamadoDate?.getDate() + ' dia(s) atrás.'
      : '';
  }
}
