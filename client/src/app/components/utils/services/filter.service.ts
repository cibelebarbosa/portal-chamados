import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  filtro = new Subject<number>();
  concluido = new Subject<boolean>();

  setLista(value: number) {
    this.filtro.next(value);
  }

  getLista() {
    return this.filtro.asObservable();
  }

  setConcluido(value: boolean) {
    this.concluido.next(value);
  }

  getConcluido() {
    return this.concluido.asObservable();
  }
}
