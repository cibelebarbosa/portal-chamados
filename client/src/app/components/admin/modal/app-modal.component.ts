import { ChamadosRepositoryService } from '../../utils/repository/chamados.repository.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChamadosStatusEnum } from '../../utils/enums/chamados.enum';
import { ChamadoInterface } from '../../utils/interfaces/chamados/chamado.interface';
import { UtilsService } from '../../utils/services/utils.service';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class ModalComponent implements OnInit {
  displayStyle: string = 'none';
  popUp: number = ChamadosStatusEnum.EM_ATENDIMENTO;
  chamadoAberto: ChamadoInterface = {} as ChamadoInterface;
  comentarioInvalido: boolean = false;
  comentario: string = '';

  constructor(
    private chamadosRepository: ChamadosRepositoryService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {}

  openPopup(value: number, chamado: ChamadoInterface) {
    this.popUp = value;
    this.displayStyle = 'block';
    this.chamadoAberto = chamado;
  }

  closePopup() {
    this.displayStyle = 'none';
    this.comentarioInvalido = false;
  }

  validarComentario() {
    if (!this.comentario) {
      this.comentarioInvalido = true;
      return;
    } else {
      this.chamadoAberto.comentario = this.comentario;
      this.chamadoAberto.data_conclusao = moment(new Date()).format(
        'YYYY-MM-DD H:mm:ss'
      );
      this.send();
    }
  }

  send() {
    if (this.popUp === ChamadosStatusEnum.EM_ATENDIMENTO)
      this.chamadoAberto.status = ChamadosStatusEnum.EM_ATENDIMENTO;
    if (this.popUp === ChamadosStatusEnum.CONCLUIDO)
      this.chamadoAberto.status = ChamadosStatusEnum.CONCLUIDO;

    this.chamadosRepository
      .updateStatusChamados(this.chamadoAberto.id, this.chamadoAberto)
      .subscribe((resp) => {});
    this.utilsService.setChamados(true);
    this.closePopup();
  }
}
