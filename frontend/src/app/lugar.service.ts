import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar.model';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  private apiUrl = 'http://localhost:3000/api/lugares';

  constructor(private http: HttpClient) {}

  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }
}
