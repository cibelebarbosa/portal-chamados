import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/app-modal.component';

@Component({
  selector: 'app-chamados',
  templateUrl: './app-chamados.component.html',
  styleUrls: ['./app-chamados.component.scss'],
})
export class ChamadosComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true }) child!: ModalComponent;
  chamadosList = [
    {
      id: 1,
      title: 'Problema de conexão',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi mauris, dictum quis pellentesque et, lobortis vel ipsum. Sed facilisis vel quam vel maximus. Aenean id neque sit amet orci pellentesque cursus. Aenean eget bibendum ex.',
      status: 'Em atendimento',
      date: new Date('04-10-2023'),
    },
    {
      id: 2,
      title: 'Máquina não liga',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi mauris, dictum quis pellentesque et, lobortis vel ipsum. Sed facilisis vel quam vel maximus. Aenean id neque sit amet orci pellentesque cursus. Aenean eget bibendum ex.',
      status: 'Aguardando',
      date: new Date('04-11-2023'),
    },
    {
      id: 3,
      title: 'Esqueci a senha',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi mauris, dictum quis pellentesque et, lobortis vel ipsum. Sed facilisis vel quam vel maximus. Aenean id neque sit amet orci pellentesque cursus. Aenean eget bibendum ex.',
      status: 'Conluído',
      date: new Date('04-12-2023'),
    },
  ];
  chamado: Array<any> = [];

  ngOnInit() {}

  concluir(id: number) {
    let chamado = this.chamadosList.filter((e) => e.id === id).shift();
    this.child.openPopup();
    this.chamado = this.chamadosList.filter((e) => e.id === id)
    //update no status da api
  }

  atender(id: number) {
    let chamado = this.chamadosList.filter((e) => e.id === id).shift();
    //update no status da api
  }

  espera(id: number): string {
    let chamado = this.chamadosList.filter((e) => e.id === id).shift();
    let diaAtual = new Date();

    return chamado?.date
      ? diaAtual.getDate() - chamado?.date.getDate() + ' dia(s) atrás.'
      : '';
  }
}
