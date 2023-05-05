import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  getClients(index: any) {
    return this.http.get<any>(`http://localhost:3000/clients/${index}`);
  }
  guardarDatos(cliente: Client): Observable<any> {
    return this.http.post<any>('http://localhost:3000/clients', cliente);
  }
  getAllClients() {
    return this.http.get<any>(`http://localhost:3000/clients`);
  }
}