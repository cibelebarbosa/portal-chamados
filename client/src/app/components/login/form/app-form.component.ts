import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { AutorizacaoAdminService } from '../../services/autorizacao-admin.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  msgError = '';
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

  submit() {
    if (!this.loginForm.valid) {
      this.msgError = 'Formulário inválido'
      return;
    }
    this.repository.login(this.loginForm.value).subscribe((res) => {
      if (res.result.message === 'Usuário não está cadastrado') {
        this.msgError = res.result.message;
      } else {
        if (res.result.message.id === 1) {
          this.autorizacaoAdminService.autorizarAdmin();
        } else {
          this.autorizacaoAdminService.autorizarCoordenador(res.result.message.id);
        }
      }
    });
  }
}
