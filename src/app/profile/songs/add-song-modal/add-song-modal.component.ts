import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import {Song} from '../../../shared/song';

@Component({
  selector: 'app-add-song-modal',
  templateUrl: './add-song-modal.component.html',
  styleUrls: ['./add-song-modal.component.scss']
})
export class AddSongModalComponent implements OnInit {
  action: Subject<any> = new Subject();
  song: Song;
  creating: boolean;

  constructor(public modalRef: MDBModalRef) {
  }

  ngOnInit() {
  }

  save() {
    this.action.next({save: true, song: this.song});
  }

  close() {
    this.action.next({save: false, song: this.song});
  }

}
