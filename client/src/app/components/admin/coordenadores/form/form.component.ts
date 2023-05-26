import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/components/services/repository.service';
import { UtilsService } from 'src/app/components/shared/services/utils.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() mode = 'incluir';
  segunda: boolean = true;
  terca: boolean = true;
  quarta: boolean = true;
  quinta: boolean = true;
  sexta: boolean = true;

  selectValue = '0';

  edicaoId: string = '';

  @Input() edicao: boolean = false;
  coordenadoresDominio: any;

  public horarioInicial: string = '';

  coordenadorForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required]],
    senha: ['', [Validators.required]],
  });

  escalaForm = {
    segunda: { dia: 1, horaInicio: '', horaFim: '' },
    terca: { dia: 2, horaInicio: '', horaFim: '' },
    quarta: { dia: 3, horaInicio: '', horaFim: '' },
    quinta: { dia: 4, horaInicio: '', horaFim: '' },
    sexta: { dia: 5, horaInicio: '', horaFim: '' },
  };

  constructor(
    private formBuilder: FormBuilder,
    private repository: RepositoryService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.mode === 'editar') {
      this.coordenadorForm.get('nome')?.disable();
      this.coordenadorForm.get('email')?.disable();
      this.coordenadorForm.get('senha')?.disable();
    }
    this.repository.getAllCoordenadores().subscribe((res) => {
      this.coordenadoresDominio = res;
    });

    this.utilsService.getCoordenadores().subscribe(() => {
      this.repository.getAllCoordenadores().subscribe((res) => {
        this.coordenadoresDominio = res;
      });
    });
  }

  montarObjeto(value?: string) {
    let variavel = {};
    if (!value) {
      variavel = {
        nome: this.coordenadorForm.get('nome')?.value,
        email: this.coordenadorForm.get('email')?.value,
        escala: [
          !this.segunda ? this.escalaForm.segunda : null,
          !this.terca ? this.escalaForm.terca : null,
          !this.quarta ? this.escalaForm.quarta : null,
          !this.quinta ? this.escalaForm.quinta : null,
          !this.sexta ? this.escalaForm.sexta : null,
        ],
      };
    } else {
      variavel = {
        id: value,
        nome: this.coordenadorForm.get('nome')?.value,
        email: this.coordenadorForm.get('email')?.value,
        escala: [
          !this.segunda
            ? { id_coordenador: value, ...this.escalaForm.segunda }
            : null,
          !this.terca
            ? { id_coordenador: value, ...this.escalaForm.terca }
            : null,
          !this.quarta
            ? { id_coordenador: value, ...this.escalaForm.quarta }
            : null,
          !this.quinta
            ? { id_coordenador: value, ...this.escalaForm.quinta }
            : null,
          !this.sexta
            ? { id_coordenador: value, ...this.escalaForm.sexta }
            : null,
        ],
      };
    }
    return variavel;
  }

  resetarForm() {
    this.escalaForm = {
      segunda: { dia: 1, horaInicio: '', horaFim: '' },
      terca: { dia: 2, horaInicio: '', horaFim: '' },
      quarta: { dia: 3, horaInicio: '', horaFim: '' },
      quinta: { dia: 4, horaInicio: '', horaFim: '' },
      sexta: { dia: 5, horaInicio: '', horaFim: '' },
    };
    this.segunda = true;
    this.terca = true;
    this.quarta = true;
    this.quinta = true;
    this.sexta = true;
    this.coordenadorForm.reset();
  }

  submit() {
    if (this.mode === 'incluir') {
      this.repository
        .loginSave(this.coordenadorForm.value)
        .subscribe((res) => {});
      this.repository.saveCoordenador(this.montarObjeto()).subscribe((res) => {
        this.utilsService.setCoordenadores(res);
        this.resetarForm();
      });
    } else if (this.mode === 'editar') {
      this.repository
        .updateCoordenador(
          parseInt(this.edicaoId),
          this.montarObjeto(this.edicaoId)
        )
        .subscribe((res) => {
          this.resetarForm();
        });
    }
  }

  getById(value: any) {
    if (value === '0') {
      this.edicao = false;
      this.resetarForm();
    } else {
      this.resetarForm();
      this.repository.getByIdCoordenadores(value).subscribe((res) => {
        this.edicaoId = res.result.coordenador[0].id;
        this.coordenadorForm
          .get('nome')
          ?.setValue(res.result.coordenador[0].nome);
        this.coordenadorForm
          .get('email')
          ?.setValue(res.result.coordenador[0].email);

        res.result.escalas.forEach((e: any) => {
          if (e.dia === 1) {
            this.escalaForm.segunda.horaInicio = e.horaInicio;
            this.escalaForm.segunda.horaFim = e.horaFim;
            this.segunda = false;
          }
          if (e.dia === 2) {
            this.escalaForm.terca.horaInicio = e.horaInicio;
            this.escalaForm.terca.horaFim = e.horaFim;
            this.terca = false;
          }
          if (e.dia === 3) {
            this.escalaForm.quarta.horaInicio = e.horaInicio;
            this.escalaForm.quarta.horaFim = e.horaFim;
            this.quarta = false;
          }
          if (e.dia === 4) {
            this.escalaForm.quinta.horaInicio = e.horaInicio;
            this.escalaForm.quinta.horaFim = e.horaFim;
            this.quinta = false;
          }
          if (e.dia === 5) {
            this.escalaForm.sexta.horaInicio = e.horaInicio;
            this.escalaForm.sexta.horaFim = e.horaFim;
            this.sexta = false;
          }
        });

        this.edicao = true;
      });
    }
  }

  delete() {
    this.repository.deleteCoordenadores(this.edicaoId).subscribe((res) => {});
  }
}
