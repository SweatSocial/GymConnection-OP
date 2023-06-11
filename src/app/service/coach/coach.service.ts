import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) { }

  getCoachs(index: any) {
    return this.http.get<any>(`http://localhost:3000/coachs/${index}`);
  }

  getAllCoachs() {
    return this.http.get<any>(`http://localhost:3000/coachs`);
  }
}
