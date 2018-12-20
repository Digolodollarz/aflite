import {Component, OnInit} from '@angular/core';
import {Incubator} from '../shared/incubator';
import {IncubationService} from './incubation.service';

@Component({
  selector: 'app-incubation',
  templateUrl: './incubation.component.html',
  styleUrls: ['./incubation.component.scss']
})
export class IncubationComponent implements OnInit {
  incubators: Incubator[];

  constructor(private service: IncubationService) {
  }

  ngOnInit() {
    this.service.getIncubators().subscribe(_incubators => this.incubators = _incubators);
  }

  add() {
    this.service.addIncubator({id: 0, name: 'uDigolo Madola', photoUrl: '/assets/img/bmw.jpg'}).subscribe(
      _incubator => {
        console.log(_incubator);
        this.service.getIncubators().subscribe(_incubators => this.incubators = _incubators);
      }
    );
  }

}
