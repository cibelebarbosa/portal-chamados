import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChamadosRepositoryService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getAllChamados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados`);
  }

  getAllByIdChamados(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados?coordenador=${id}`);
  }

  getAllByFiltersChamados(status: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados?status=${status}`);
  }
  updateStatusChamados(id: number, chamado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chamado/${id}`, chamado);
  }

  saveChamados(chamado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chamado`, chamado);
  }

  enviarEmail(email: string, mensagem: string): Observable<any> {
    let body = {
      email: email,
      mensagem: mensagem,
    };
    return this.http.post(`${this.apiUrl}/send`, body);
  }
}
