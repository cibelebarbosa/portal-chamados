import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  coordenadores = new Subject<any>;
  chamados = new Subject<any>;

  getCoordenadores(){
    return this.coordenadores.asObservable();
  }

  setCoordenadores(value: any){
    this.coordenadores.next(value);
  }

  getChamados(){
    return this.chamados.asObservable();
  }

  setChamados(value: any){
    this.chamados.next(value);
  }
}
