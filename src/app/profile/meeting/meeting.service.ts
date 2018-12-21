import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meeting} from '../../shared/meeting';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${environment.apiUrl}/meetings`);
  }

  getUserMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${environment.apiUrl}/user/${this.auth.currentUserValue.id}/meetings`);
  }

  getMeeting(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${environment.apiUrl}/user/${this.auth.currentUserValue.id}/meetings/${id}`);
  }
}
