import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import {Song} from '../../../shared/song';
import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../auth/user';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-add-song-modal',
  templateUrl: './add-song-modal.component.html',
  styleUrls: ['./add-song-modal.component.scss']
})
export class AddSongModalComponent implements OnInit {
  action: Subject<any> = new Subject();
  song: Song = new Song();
  creating: boolean;
  artists: User[] = [];
  producers: User[] = [];

  constructor(public modalRef: MDBModalRef,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(
      _users => {
        this.artists = _users;
        this.producers = _users;
      }
    );
  }

  save() {
    this.action.next({save: true, song: this.song});
    this.modalRef.hide();
  }

  close() {
    this.action.next({save: false, song: this.song});
    this.modalRef.hide();
  }

}
