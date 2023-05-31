import { EscalasDominioInterface } from '../dominios/escalas-dominio.interface';

export interface CoordenadorRequestInterface {
  id?: number;
  nome: string;
  email: string;
  escala: Array<EscalasDominioInterface | null> | null;
}
