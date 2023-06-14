import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/services/repository.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../../shared/services/utils.service';

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
    private repository: RepositoryService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.repository.getAllCoordenadores().subscribe((res) => {
      this.coordenadoresDominio = res;
    });

    this.utilsService.getCoordenadores().subscribe(() => {
      this.repository.getAllCoordenadores().subscribe((res) => {
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

    this.repository.save(formValues).subscribe((data) => {
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
        this.repository
          .enviarEmail(formValues.email, this.montarEmail(formValues))
          .subscribe(() => {});
      }
    });
  }
}
