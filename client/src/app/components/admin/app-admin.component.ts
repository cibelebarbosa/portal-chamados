import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../utils/services/filter.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.scss'],
})
export class AdminComponent implements OnInit {
  conteudo = 0;
  showFiller = false;
  panelOpenState = false;
  constructor(private filtro: FiltroService, private router: Router) {}

  ngOnInit() {
    // if(sessionStorage.getItem('canAccess') != 'true'){
    //   this.router.navigate(['/login'])
    // }
  }

  filtrarLista(status: number) {
    this.filtro.setLista(status);
  }

}
