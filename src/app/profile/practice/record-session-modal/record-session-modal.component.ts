import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {PracticeSession} from '../../../shared/practice-session';

@Component({
  selector: 'app-record-session-modal',
  templateUrl: './record-session-modal.component.html',
  styleUrls: ['./record-session-modal.component.scss']
})
export class RecordSessionModalComponent implements OnInit {

  action: Subject<any> = new Subject();
  session: PracticeSession = new PracticeSession();

  constructor() { }

  ngOnInit() {
  }

}
