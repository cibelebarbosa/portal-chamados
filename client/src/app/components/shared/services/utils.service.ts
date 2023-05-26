import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  coordenadores = new Subject<any>;

  getCoordenadores(){
    return this.coordenadores.asObservable();
  }

  setCoordenadores(value: any){
    this.coordenadores.next(value);
  }
}
