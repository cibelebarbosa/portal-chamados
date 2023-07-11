import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../../utils/services/utils.service';
import { CoordenadorRepositoryService } from '../../utils/repository/coordenador.repository.service';
import { ChamadosRepositoryService } from '../../utils/repository/chamados.repository.service';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
})
export class PerfilFormComponent implements OnInit {
  msgError = '';
  isOpenMsg = '';
  isOpen = false;
  @Input() coordenadores: any = [];
  perfilForm: FormGroup = this.formBuilder.group({
    aluno: ['', [Validators.required]],
    ra: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    coordenador: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
  });
  constructor(
    private coordenadorRepository: CoordenadorRepositoryService,
    private chamadosRepository: ChamadosRepositoryService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {

  }



  montarEmail(value: any) {
    let email = `<h1>Chamado aberto com sucesso</h1>
    <h2>${value.aluno} seu chamado foi criado no dia ${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}.</h2>
    <h3>Chamado: ${value.titulo}</h3>
    <p>Descrição: ${value.descricao}</p>
    <p>Coordenador: ${
      this.coordenadores.filter(
        (e: any) => e.id === value.coordenador
      )[0].nome
    }</p>`;

    return email;
  }

  submit() {
    if (!this.perfilForm.valid) {
      this.msgError = 'Formulário inválido';
      return;
    }

    let formValues = this.perfilForm.value;
    formValues.coordenador = parseInt(formValues.coordenador);
    formValues.ra = parseInt(formValues.ra);

    this.chamadosRepository.saveChamados(formValues).subscribe((data) => {
      if (!data.error) {
        this.isOpen = true;
        this.isOpenMsg = 'Seu chamado foi criado com sucesso.';
        setTimeout(() => {
          this.isOpen = false;
        }, 3000);
        this.perfilForm.reset();
        this.perfilForm.get('coordenador')?.setValue('');
        this.utilsService.setChamados(true);
      } else {
        this.isOpen = false;
      }

      if (this.isOpen) {
        this.chamadosRepository
          .enviarEmail(formValues.email, this.montarEmail(formValues))
          .subscribe(() => {});
      }
    });
  }
}
