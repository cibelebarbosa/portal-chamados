import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginRepositoryService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  login(login: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, login);
  }

  loginSave(login: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginsave`, login);
  }

  getAllUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/login`);
  }

  deleteUsuarios(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/login/${id}`);
  }
}
