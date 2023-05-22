import { RepositoryService } from '../../services/repository.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() chamado: Array<any> = [];
  displayStyle = 'none';
  popUp = 1;
  chamadoAberto: any = {};

  constructor(private repository: RepositoryService) {}
comentario = "";
  ngOnInit() {}

  openPopup(value: number, chamado: any) {
    this.popUp = value;
    this.displayStyle = 'block';
    this.chamadoAberto = chamado;
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  send() {
    if (this.popUp === 1) this.chamadoAberto.status = 2;
    if (this.popUp === 2) this.chamadoAberto.status = 1;
    this.chamadoAberto.comentario = this.comentario;
    this.repository
      .updateStatus(this.chamadoAberto.id, this.chamadoAberto)
      .subscribe((resp) => {
        console.log(resp);
      });
    this.closePopup();
  }
}
