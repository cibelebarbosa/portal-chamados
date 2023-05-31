import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AutorizacaoAdminService } from '../services/autorizacao-admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() pageTitle: string = '';
  @Input() drawer: any;
  logged: boolean = false;
  showFiller: boolean = false;

  constructor(private autorizacaoAdminService: AutorizacaoAdminService) {}

  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged') === 'true' ? true : false;
  }

  sair(){
   this.autorizacaoAdminService.deslogar();
  }

}
