import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../shared/song';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) {
  }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.apiUrl}/songs`);
  }

  findSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.apiUrl}/songs`);
  }

  getUserSongs(userId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.apiUrl}/users/${userId}/songs`);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${environment.apiUrl}/songs`, song);
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(`${environment.apiUrl}/songs`, song);
  }

}
