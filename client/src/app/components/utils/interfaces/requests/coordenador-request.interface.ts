import { CoordenadorDominioInterface } from '../dominios/coordenador-dominio.interface';
import { EscalasDominioInterface } from '../dominios/escalas-dominio.interface';

export interface CoordenadorRequestInterface {
  coordenador: CoordenadorDominioInterface;
  escalas: Array<EscalasDominioInterface | null> | null;
}
