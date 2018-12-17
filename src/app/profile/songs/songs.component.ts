import {Component, OnInit} from '@angular/core';
import {Song} from '../../shared/song';
import {AuthService} from '../../auth/auth.service';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {AddSongModalComponent} from './add-song-modal/add-song-modal.component';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs: Song[];
  newSong: Song = new Song();
  modalRef: MDBModalRef;

  constructor(private auth: AuthService,
              private modalService: MDBModalService) {
  }

  ngOnInit() {
    if (this.auth.currentUserValue == null) {
      return;
    }
    this.songs = [
      {
        id: 2,
        producer: this.auth.currentUserValue,
        thumbUrl: '/assets/img/M550i-750x500.jpg',
        title: 'Gumba Wakumba',
        artist: this.auth.currentUserValue
      },
      {
        id: 4,
        producer: this.auth.currentUserValue,
        thumbUrl: '/assets/img/M550i-750x500.jpg',
        title: 'Ndawira Mugomba',
        artist: this.auth.currentUserValue
      },
      {
        id: 8,
        producer: this.auth.currentUserValue,
        thumbUrl: '/assets/img/M550i-750x500.jpg',
        title: 'Ndokuonai Ndapinda',
        artist: this.auth.currentUserValue
      },
    ];
  }

  editSong(song: Song) {
    this.modalRef = this.modalService.show(AddSongModalComponent);
    this.modalRef.content.song = song;
  }

  createSong() {
    this.modalRef = this.modalService.show(AddSongModalComponent);
    this.modalRef.content.song = this.newSong;
    this.modalRef.content.creating = true;
    this.modalRef.content.action.subscribe(
      (result: any) => {
        if (result.save) {
          alert('saved');
        } else {
          this.newSong = result.song;
        }
      }
    );
  }
}
