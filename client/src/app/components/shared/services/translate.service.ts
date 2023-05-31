import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor() {}

  statusTranlation(status: number): string {
    if (status === 0) return 'Aberto';
    else if (status === 1) return 'Em atendimento';
    else if (status === 2) return 'Concluído';
    else return '';
  }
}
