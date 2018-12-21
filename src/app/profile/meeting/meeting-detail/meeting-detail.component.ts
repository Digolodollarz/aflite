import {Component, OnInit} from '@angular/core';
import {Meeting} from '../../../shared/meeting';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MeetingService} from '../meeting.service';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {
  meeting: Meeting;
  mId: number;

  constructor(private route: ActivatedRoute,
              private service: MeetingService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.mId = params.get('id'));
    console.log(this.mId);
    this.service.getMeeting(this.mId).subscribe(_meeting => this.meeting = _meeting);
  }

}
