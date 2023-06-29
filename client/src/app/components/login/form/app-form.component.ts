import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizacaoAdminService } from '../../utils/services/autorizacao-admin.service';
import { ErroInterface } from '../../utils/interfaces/mensagens/erro.interface';
import { LoginRepositoryService } from '../../utils/repository/login.repository.service';

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
    private loginRepository: LoginRepositoryService,
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
    this.loginRepository.login(this.loginForm.value).subscribe((res) => {
      if (res.result.message.msg === 'Usuário não está cadastrado') {
        this.erro.msg = res.result.message.msg;
        this.erro.status = true;
      } else {
        if (res.result.message.id === 1) {
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
