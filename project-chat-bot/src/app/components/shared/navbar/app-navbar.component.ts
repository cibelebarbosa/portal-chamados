import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  @Input() pageTitle: string = '';

  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged') === 'true' ? true : false;
  }
}
