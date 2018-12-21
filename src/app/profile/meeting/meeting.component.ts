import {Component, OnInit} from '@angular/core';
import {MeetingService} from './meeting.service';
import {Meeting} from '../../shared/meeting';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  meetings: Meeting[];
  error: any;

  constructor(private service: MeetingService) {
  }

  ngOnInit() {
    this.service.getUserMeetings().subscribe(_meetings => this.meetings = _meetings, error1 => this.error = error1);
  }

}
