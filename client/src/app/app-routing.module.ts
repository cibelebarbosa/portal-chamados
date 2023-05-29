import { LoginComponent } from './components/login/app-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/app-home.component';
import { AdminComponent } from './components/admin/app-admin.component';
import { PerfilComponent } from './components/perfil/app-perfil.component';
import { CoordenadoresComponent } from './components/admin/coordenadores/coordenadores.component';
import { CoordenadorComponent } from './components/coordenadores/coordenador.component';
import { AutorizadoGuard } from './_guard/autorizado-admin.guard';
import { AutorizadoCoordenadorGuard } from './_guard/autorizado-coordenador.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AutorizadoGuard] },
  { path: 'perfil', component: PerfilComponent },
  {
    path: 'coordenador/:id',
    component: CoordenadorComponent, canActivate: [AutorizadoCoordenadorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
