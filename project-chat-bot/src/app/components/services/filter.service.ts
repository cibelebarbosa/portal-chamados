import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  filtro = new Subject<number>();

  setLista(value: number) {
    this.filtro.next(value);
  }

  getLista() {
    return this.filtro.asObservable();
  }
}
