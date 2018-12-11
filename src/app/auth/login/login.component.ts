import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  error: any;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User();
  }

  login() {
    console.log(this.user);
    this.authService.login(this.user.username, this.user.password).subscribe(_user => {
      if (_user) {
        this.router.navigate(['']);
      }
    }, _error => this.error = _error.error);
  }

}
