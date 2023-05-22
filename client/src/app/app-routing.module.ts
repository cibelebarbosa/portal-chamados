import { LoginComponent } from './components/login/app-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/app-home.component';
import { AdminComponent } from './components/admin/app-admin.component';
import { PerfilComponent } from './components/perfil/app-perfil.component';
import { CoordenadoresComponent } from './components/admin/coordenadores/coordenadores.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'perfil', component: PerfilComponent },
  // { path: 'coordenadores', component: CoordenadoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
