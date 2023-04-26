import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  ngOnInit() {}

  validar() {
    sessionStorage.setItem('logged', 'true');
  }
}
