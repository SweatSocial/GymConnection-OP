import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(index: any) {
    return this.http.get<any>(`https://test-api-whcc.onrender.com/clients/${index}`);
  }

  getAllClients() {
    return this.http.get<any>(`https://test-api-whcc.onrender.com/clients`);
  }

}
