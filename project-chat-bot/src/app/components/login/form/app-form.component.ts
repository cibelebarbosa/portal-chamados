import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() logged: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {}

  validar() {
    this.logged.emit(true);
    sessionStorage.setItem("logged", "true")
  }
}
