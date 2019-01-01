import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {PracticeSession} from '../../shared/practice-session';
import {environment} from '../../../environments/environment';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {RecordSessionModalComponent} from './record-session-modal/record-session-modal.component';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  sessions: PracticeSession[] = [];
  newSession: PracticeSession = new PracticeSession();
  modalRef: MDBModalRef;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              private modalService: MDBModalService) {
  }

  ngOnInit() {
    this.http.get<PracticeSession[]>(`${environment.apiUrl}/practice`)
      .subscribe(_sessions => {
        console.log(_sessions);
        this.sessions = _sessions.map(
          _session => {
            _session.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(_session.fileUrl);
            return _session;
          }
        );
      });
  }

  createSession() {
    this.modalRef = this.modalService.show(RecordSessionModalComponent);
    this.modalRef.content.session = this.newSession;
    this.modalRef.content.action.subscribe(
      (result: any) => {
        if (result.save) {
          const session = result.session;
          this.http.post<PracticeSession[]>(`${environment.apiUrl}/practice`, session)
            .subscribe(_sessions => {
              console.log(_sessions);
              this.sessions = _sessions.map(
                _session => {
                  _session.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(_session.fileUrl);
                  return _session;
                }
              );
            });
        } else if (result.cancel) {
          this.newSession = new PracticeSession();
        } else {
          this.newSession = result.session;
        }
      }
    );
  }

}
