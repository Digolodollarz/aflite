import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {User} from './auth/user';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aflite';
  user: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    this.authService.currentUser.subscribe(_user => {
      this.user = _user;
      console.log(_user);
    });
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['login']);
  }
}
