import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../admin/modal/app-modal.component';
import { RepositoryService } from '../../services/repository.service';
import { TranslationService } from '../../services/translate.service';
import { FiltroService } from '../../services/filter.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './app-chamados.component.html',
  styleUrls: ['./app-chamados.component.scss'],
})
export class ChamadosComponent implements OnInit {
  coordenadorId: number = 0;
  @ViewChild(ModalComponent, { static: true }) child!: ModalComponent;
  chamadosList: any = [
    // {
    //   id: 1,
    //   titulo: 'Problema de conexão',
    //   descricao:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi mauris, dictum quis pellentesque et, lobortis vel ipsum. Sed facilisis vel quam vel maximus. Aenean id neque sit amet orci pellentesque cursus. Aenean eget bibendum ex.',
    //   status: 1,
    //   date: new Date('04/10/2023'),
    // },
    // {
    //   id: 2,
    //   titulo: 'Máquina não liga',
    //   descricao:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi mauris, dictum quis pellentesque et, lobortis vel ipsum. Sed facilisis vel quam vel maximus. Aenean id neque sit amet orci pellentesque cursus. Aenean eget bibendum ex.',
    //   status: 0,
    //   date: new Date('04/11/2023'),
    // },
    // {
    //   id: 3,
    //   titulo: 'Esqueci a senha',
    //   description:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi mauris, dictum quis pellentesque et, lobortis vel ipsum. Sed facilisis vel quam vel maximus. Aenean id neque sit amet orci pellentesque cursus. Aenean eget bibendum ex.',
    //   status: 2,
    //   date: new Date('04/12/2023'),
    // },
  ];
  chamado: Array<any> = [];

  constructor(
    private repository: RepositoryService,
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
    this.repository.getAll().subscribe((res: any) => {
      this.chamadosList = res.result;
    });
  }

  carregarListaCoordenador(id: number) {
    this.repository.getAllById(id).subscribe((res: any) => {
      this.chamadosList = res.result;
    });
  }

  carregarListaFiltrada(data: number) {
    if (this.coordenadorId) {
      if (data === 3) {
        this.carregarListaCoordenador(this.coordenadorId);
        return;
      }
      this.repository.getAllByFilters(data).subscribe((data) => {
        this.chamadosList = data.result.filter((e: any) => e.coordenador == this.coordenadorId);
      });
    } else {
      if (data === 3) {
        this.carregarLista();
        return;
      }
      this.repository.getAllByFilters(data).subscribe((data) => {
        this.chamadosList = data.result;
      });
    }
  }

  concluir(id: number, item: any) {
    this.child.openPopup(1, item);
    this.chamado = this.chamadosList.filter((e: any) => e.id === id);
    this.filtro.setConcluido(true);
  }

  atender(id: number, item: any) {
    this.child.openPopup(2, item);
  }

  espera(date: any): string {
    let chamadoDate = new Date(date);
    let diaAtual = new Date();
    return chamadoDate
      ? diaAtual.getDate() - chamadoDate?.getDate() + ' dia(s) atrás.'
      : '';
  }
}
