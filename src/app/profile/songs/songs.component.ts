import {Component, OnInit} from '@angular/core';
import {Song} from '../../shared/song';
import {AuthService} from '../../auth/auth.service';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {AddSongModalComponent} from './add-song-modal/add-song-modal.component';
import {SongsService} from './songs.service';

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
              private modalService: MDBModalService,
              private service: SongsService) {
  }

  ngOnInit() {
    if (this.auth.currentUserValue == null) {
      return;
    }
    this.service.getSongs().subscribe(
      _songs => this.songs = _songs
    );
  }

  editSong(song: Song) {
    this.modalRef = this.modalService.show(AddSongModalComponent);
    this.modalRef.content.song = song;
    this.modalRef.content.action.subscribe(
      (result: any) => {
        if (result.save) {
          this.service.updateSong(result.song).subscribe(
            _ => {
              this.service.getSongs().subscribe(
                _songs => {
                  this.songs = _songs;
                  console.log(_songs);
                }
              );
            }
          );
        } else {
          this.newSong = result.song;
        }
      }
    );
  }

  createSong() {
    this.modalRef = this.modalService.show(AddSongModalComponent);
    this.modalRef.content.song = this.newSong;
    this.modalRef.content.creating = true;
    this.modalRef.content.action.subscribe(
      (result: any) => {
        if (result.save) {
          this.service.addSong(result.song).subscribe(
            _ => {
              this.newSong = new Song();
              this.service.getSongs().subscribe(
                _songs => {
                  this.songs = _songs;
                  console.log(_songs);
                }
              );
            }
          );
        } else {
          this.newSong = result.song;
        }
      }
    );
  }
}
