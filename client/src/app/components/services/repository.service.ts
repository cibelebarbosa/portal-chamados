import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  login(login: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, login);
  }

  loginSave(login: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginsave`, login);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados`);
  }

  getAllPromise(): Promise<any> {
    return this.http.get(`${this.apiUrl}/chamados`).toPromise();
  }
  getAllById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados?coordenador=${id}`);
  }

  getAllByFilters(status: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados?status=${status}`);
  }
  updateStatus(id: number, chamado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chamado/${id}`, chamado);
  }

  save(chamado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chamado`, chamado);
  }

  updateCoordenador(id: number, coordenador: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/coordenadores/${id}`, coordenador);
  }

  saveCoordenador(coordenador: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/coordenadores`, coordenador);
  }

  getAllCoordenadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coordenadores`);
  }

  getByIdCoordenadores(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/coordenadores/${id}`);
  }

  deleteCoordenadores(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/coordenadores/${id}`);
  }

  enviarEmail(email: string, mensagem: string): Observable<any> {
    let body = {
      email: email,
      mensagem: mensagem,
    };
    return this.http.post(`${this.apiUrl}/send`, body);
  }
}
