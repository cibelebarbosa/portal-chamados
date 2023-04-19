import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit() {
    sessionStorage.removeItem('logged');
    sessionStorage.setItem('logged', 'false');
  }
}
