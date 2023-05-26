import { AdminComponent } from '../../admin/app-admin.component';
import { ChamadosComponent } from '../chamados/app-chamados.component';
import { FiltroService } from '../../services/filter.service';
import { RepositoryService } from '../../services/repository.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  @Input() pageTitle: string = '';
  showFiller = false;
  @Input() drawer: any;

  constructor() {}

  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged') === 'true' ? true : false;
  }

  sair(){
    sessionStorage.setItem('canAccess', 'false')
  }

}
