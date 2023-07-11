import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoordenadorRepositoryService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  updateCoordenador(id: number, coordenador: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/coordenadores/${id}`, coordenador);
  }

  saveCoordenador(coordenador: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/coordenadores`, coordenador);
  }

  getAllCoordenadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coordenadores`);
  }

  getAllDiasDominio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diadominio`);
  }

  getAllCoordenadoresByFilters(dia: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/coordenadores?dia=${dia}`);
  }

  getByIdCoordenadores(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/coordenadores/${id}`);
  }

  deleteCoordenadores(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/coordenadores/${id}`);
  }

  deleteEscalas(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/escalas/${id}`);
  }
}
