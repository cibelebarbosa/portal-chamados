import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados`);
  }

  getAllByFilters(status: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamados?status=${status}`);
  }
  updateStatus(id: number, chamado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chamado/${id}`, chamado);
  }
  save(chamado: any): Observable<any> {
    console.log(chamado);

    return this.http.post(`${this.apiUrl}/chamado`, chamado);
  }

  getCursos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos`);
  }

  login(login: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, login);
  }
}
