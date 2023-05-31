import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizacaoAdminService } from '../components/shared/services/autorizacao-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AutorizadoCoordenadorGuard implements CanActivate {
  constructor(
    private autorizacaoAdminService: AutorizacaoAdminService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.autorizacaoAdminService.obterStatusLoginCoordenador()) return true;

    this._router.navigate(['/login']);
    return false;
  }
}
