import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VideoPitch} from '../../shared/video-pitch';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getMyVideo(): Observable<VideoPitch> {
    return this.http.get<VideoPitch>(`${environment.apiUrl}/users/${this.auth.currentUserValue.id}/videos/pitch`);
  }

  setMyVideo(video: VideoPitch): Observable<VideoPitch> {
    return this.http.post<VideoPitch>(`${environment.apiUrl}/users/${this.auth.currentUserValue.id}/videos/pitch`,
      video);
  }
}
