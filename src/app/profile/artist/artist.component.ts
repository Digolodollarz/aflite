import {Component, OnInit} from '@angular/core';
import {Song} from '../../shared/song';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  songs: Song[];

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth.currentUserValue == null) {
      return;
    }
    this.songs = [
      {id: 2, title: 'Gumba Wakumba', artist: this.auth.currentUserValue},
      {id: 4, title: 'Ndawira Mugomba', artist: this.auth.currentUserValue},
      {id: 8, title: 'Ndokuonai Ndapinda', artist: this.auth.currentUserValue},
    ];
  }

}
