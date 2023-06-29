import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../../utils/services/utils.service';
import { CoordenadorRepositoryService } from '../../utils/repository/coordenador.repository.service';
import { ChamadosRepositoryService } from '../../utils/repository/chamados.repository.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
})
export class PerfilFormComponent implements OnInit {
  msgError = '';
  sucesso: boolean = false;
  coordenadoresDominio: any = [];
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
    this.coordenadorRepository.getAllCoordenadores().subscribe((res) => {
      this.coordenadoresDominio = res;
    });

    this.utilsService.getCoordenadores().subscribe(() => {
      this.coordenadorRepository.getAllCoordenadores().subscribe((res) => {
        this.coordenadoresDominio = res;
      });
    });
  }

  montarEmail(value: any) {
    let email = `<h1>Chamado aberto com sucesso</h1>
    <h2>${value.aluno} seu chamado foi criado no dia ${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}.</h2>
    <h3>Chamado: ${value.titulo}</h3>
    <p>Descrição: ${value.descricao}</p>
    <p>Coordenador: ${
      this.coordenadoresDominio.filter(
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
        this.sucesso = true;
        setTimeout(() => {
          this.sucesso = false;
        }, 3000);
        this.perfilForm.reset();
        this.perfilForm.get('coordenador')?.setValue('');
        this.utilsService.setChamados(true);
      } else {
        this.sucesso = false;
      }

      if (this.sucesso) {
        this.chamadosRepository
          .enviarEmail(formValues.email, this.montarEmail(formValues))
          .subscribe(() => {});
      }
    });
  }
}
