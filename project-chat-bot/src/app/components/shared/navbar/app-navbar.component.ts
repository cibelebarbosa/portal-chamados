import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class NavbarComponent {
  @Input() logged: boolean = false;
}
