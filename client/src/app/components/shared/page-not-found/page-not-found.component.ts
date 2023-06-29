import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  @Input() lista: any[] = [];
  @Input() mensagem: string = 'OOPS...não encontramos nada.';

  constructor() { }

  ngOnInit() {
  }

}
