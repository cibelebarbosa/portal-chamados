import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { AutorizacaoAdminService } from '../../shared/services/autorizacao-admin.service';
import { ErroInterface } from '../../shared/interfaces/mensagens/erro.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  erro: ErroInterface = { status: false, msg: '' };
  formInvalid: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  constructor(
    private repository: RepositoryService,
    private formBuilder: FormBuilder,
    private autorizacaoAdminService: AutorizacaoAdminService
  ) {}

  ngOnInit() {}

  validaFormulario() {
    if (this.loginForm.invalid) {
      this.erro.status = true;
      this.erro.msg = 'Formulário inválido';
      this.formInvalid = true;
    } else {
      this.submit();
    }
  }

  submit() {
    this.repository.login(this.loginForm.value).subscribe((res) => {
      if (res.result.message.msg === 'Usuário não está cadastrado') {
        this.erro.msg = res.result.message.msg;
        this.erro.status = true;
      } else {
        if (res.result.message.id === 34) {
          this.autorizacaoAdminService.autorizarAdmin();
        } else {
          this.autorizacaoAdminService.autorizarCoordenador(
            res.result.message.id
          );
        }
      }
    });
  }
}
