import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
})
export class LoginComponent implements OnInit {
  logged: boolean = false;
  ngOnInit() {}

  metodo(event: any) {
    this.logged = event;
    console.log(this.logged);

  }
}
