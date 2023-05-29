import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutorizacaoAdminService {
  constructor(private router: Router){};

  autorizarAdmin() {
    sessionStorage.setItem('canAccess', '1');
    this.router.navigate(['/admin']);
    sessionStorage.setItem('logged', 'true');
  }

  autorizarCoordenador(id: any) {
    sessionStorage.setItem('canAccess', id.toString());
    this.router.navigate(['/coordenador/', id]);
    sessionStorage.setItem('logged', 'true');
  }

  deslogar() {
    sessionStorage.removeItem('canAccess');
  }

  obterStatusLoginAdmin() {
    return sessionStorage.getItem('canAccess') === '1'? true : false;
  }

  obterStatusLoginCoordenador() {
    return sessionStorage.getItem('canAccess') && sessionStorage.getItem('canAccess') !== '1' ? true : false;
  }
}
