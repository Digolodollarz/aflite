import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Incubator} from '../shared/incubator';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncubationService {
  constructor(private http: HttpClient) {
  }

  getIncubators(): Observable<Incubator[]> {
    return this.http.get<Incubator[]>(`${environment.apiUrl}/incubators`);
  }

  addIncubator(incubator: Incubator): Observable<Incubator> {
    return this.http.post<Incubator>(`${environment.apiUrl}/incubators`, incubator);
  }
}
