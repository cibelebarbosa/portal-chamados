import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private formBuilder: FormBuilder
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
          this.router.navigate(['/admin']);
          sessionStorage.setItem('canAccess', res.result.message.canAccess);
          sessionStorage.setItem('logged', 'true');
        } else {
          this.router.navigate(['/coordenador']);
          sessionStorage.setItem('canAccess', res.result.message.canAccess);
          sessionStorage.setItem('logged', 'true');
        }
      }
    });
  }
}
