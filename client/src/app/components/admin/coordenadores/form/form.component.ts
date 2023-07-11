import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoordenadorDominioInterface } from '../../../utils/interfaces/dominios/coordenador-dominio.interface';
import { EscalasDominioInterface } from '../../../utils/interfaces/dominios/escalas-dominio.interface';
import { SucessoInterface } from '../../../utils/interfaces/mensagens/sucesso.interface';
import { CoordenadorRequestInterface } from '../../../utils/interfaces/requests/coordenador-request.interface';
import { UtilsService } from '../../../utils/services/utils.service';
import { CoordenadorRepositoryService } from 'src/app/components/utils/repository/coordenador.repository.service';
import { LoginRepositoryService } from 'src/app/components/utils/repository/login.repository.service';
import { ChamadosRepositoryService } from 'src/app/components/utils/repository/chamados.repository.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() mode = 'incluir';
  @Input() edicao: boolean = false;
  selectValue: string = '';
  coordenadoresDominio: Array<CoordenadorDominioInterface> = [];
  coordenadorForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required]],
    senha: ['', [Validators.required]],
  });
  formEscala: FormArray = new FormArray([
    this.formBuilder.group({
      id_escala: '',
      dia: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFim: ['', [Validators.required]],
    }),
  ]);
  editingItem!: CoordenadorRequestInterface;
  diasDominio: any = [];
  escalasDeletadas: any = [];
  isOpen = false;
  isOpenMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private coordenadorRepository: CoordenadorRepositoryService,
    private loginRepository: LoginRepositoryService,
    private utilsService: UtilsService,
    private chamadosRepository: ChamadosRepositoryService
  ) {}

  ngOnInit(): void {
    this.coordenadorRepository.getAllCoordenadores().subscribe((res) => {
      this.coordenadoresDominio = res;
    });

    this.coordenadorRepository.getAllDiasDominio().subscribe((res) => {
      this.diasDominio = res;
    });

    this.utilsService.getCoordenadores().subscribe(() => {
      this.coordenadorRepository.getAllCoordenadores().subscribe((res) => {
        this.coordenadoresDominio = res;
      });
    });

    this.utilsService.getToggle().subscribe(() => {
      this.edicao = false;
    });
  }

  getById(value: string) {
    this.edicao = true;
    this.resetarForm();
    this.coordenadorRepository.getByIdCoordenadores(value).subscribe((res) => {
      this.editingItem = res.result;
      this.coordenadorForm.patchValue(res.result.coordenador);
      res.result.escalas.map(
        (element: Array<EscalasDominioInterface>, index: number) => {
          if (index !== 0) this.addEscala();
        }
      );
      this.formEscala.patchValue(res.result.escalas);
      // this.disableInputs();
    });
    this.coordenadorForm.disable();
  }

  disableInputs() {
    this.formEscala.controls.forEach((form) => {
      form.disable();
    });
  }

  addEscala() {
    this.formEscala.push(
      this.formBuilder.group({
        id_escala: '',
        dia: ['', [Validators.required]],
        horaInicio: ['', [Validators.required]],
        horaFim: ['', [Validators.required]],
      })
    );
  }

  removeEscala(value: number, item: any) {
    if (item.value.id_escala === '') {
      this.formEscala.removeAt(value);
    } else {
      this.escalasDeletadas.push(item.value.id_escala);
      this.formEscala.removeAt(value);
    }
  }

  montarObjeto(value?: number) {
    return !value
      ? {
          coordenador: this.coordenadorForm.value,
          escalas: this.formEscala.value,
        }
      : {
          coordenador: this.editingItem.coordenador,
          escalas: this.formEscala.value,
        };
  }

  resetarForm() {
    this.coordenadorForm.reset();
    this.formEscala = new FormArray([
      this.formBuilder.group({
        id_escala: '',
        dia: '',
        horaInicio: '',
        horaFim: '',
      }),
    ]);
  }

  montarEmail(value: any) {
    let email = `<h1>Coordenador cadastrado</h1>
    <h2>${value.nome} seu cadastro foi criado no dia ${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}.</h2>
    <h3>Nome: ${value.nome}</h3>
    <p>E-mail: ${value.email}</p>
    <p>Senha: ${value.senha}</p>`;

    return email;
  }

  submitInclude() {
    this.coordenadorRepository
      .saveCoordenador(this.montarObjeto())
      .subscribe((res) => {
        this.loginRepository
          .loginSave({
            ...this.coordenadorForm.value,
            id_coordenador: res.result.id,
          })
          .subscribe((res) => {});
        this.chamadosRepository
          .enviarEmail(
            this.coordenadorForm.get('email')?.value,
            this.montarEmail(this.coordenadorForm.value)
          )
          .subscribe(() => {});
        this.utilsService.setCoordenadores(res);
        this.resetarForm();
        this.isOpenMsg = 'Coordenador incluido com sucesso!';
        this.isOpen = true;
        setTimeout(() => {
          this.isOpen = false;
        }, 3000);
      });
  }

  submitEdit() {
    this.deleteEscalas();
    this.coordenadorRepository
      .updateCoordenador(
        this.editingItem.coordenador.id!,
        this.montarObjeto(this.editingItem.coordenador.id!)
      )
      .subscribe((res) => {
        this.isOpen = true;
        this.isOpenMsg = 'Coordenador alterado com sucesso.';
        this.selectValue = '';
        this.edicao = false;
        setTimeout(() => {
          this.isOpen = false;
        }, 3000);
        this.resetarForm();
      });
  }

  delete() {
    this.loginRepository
      .deleteUsuarios(this.editingItem.coordenador.id)
      .subscribe(() => {
        this.coordenadorRepository
          .deleteCoordenadores(this.editingItem.coordenador.id)
          .subscribe((res) => {
            this.isOpenMsg = 'Coordenador removido com sucesso!';
            this.utilsService.setCoordenadores(res);
            this.isOpen = true;
            this.selectValue = '';
            this.edicao = false;
            setTimeout(() => {
              this.isOpen = false;
            }, 3000);
          });
      });
  }

  deleteEscalas() {
    if (this.escalasDeletadas.length > 0) {
      this.escalasDeletadas.forEach((element: any) => {
        this.coordenadorRepository
          .deleteEscalas(element)
          .subscribe((res) => {});
      });
      this.utilsService.getCoordenadores().subscribe(() => {
        this.coordenadorRepository.getAllCoordenadores().subscribe((res) => {
          this.coordenadoresDominio = res;
        });
      });
    }
    this.escalasDeletadas = [];
  }

  disableButtonSave() {
    if (this.editingItem !== undefined) {
      return (
        JSON.stringify(this.editingItem.escalas) ===
          JSON.stringify(this.formEscala.value) || this.formEscala.invalid
      );
    } else {
      return this.coordenadorForm.invalid || this.formEscala.invalid;
    }
  }
}
