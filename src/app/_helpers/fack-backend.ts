import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {User} from '../auth/user';
import {Incubator} from '../shared/incubator';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: User[] = [
      {id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'},
      {id: 2, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User'},
      {id: 3, username: 'N01310389L', password: '210117483', firstName: 'Edmore M', lastName: 'Gonese'},
    ];

    const incubators: Incubator[] = [
      {id: 1, name: 'John Nkomo IRL', photoUrl: '/assets/img/card.jpg'},
      {id: 1, name: 'James le Doug', photoUrl: '/assets/img/card.jpg'},
      {id: 1, name: 'David la-Grange', photoUrl: '/assets/img/card.jpg'},
      {id: 1, name: 'Romain daVinci', photoUrl: '/assets/img/card.jpg'},
      {id: 1, name: 'Martin Luther King', photoUrl: '/assets/img/card.jpg'},
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate - public
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
        if (!user) {
          return error('Username or password is incorrect');
        }
        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: `fake-jwt-token`
        });
      }

      // get all users
      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        return ok(users);
      }


      // get all incubators
      if (request.url.endsWith('/incubators') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        return ok(incubators);
      }
      // add incubator
      if (request.url.endsWith('/incubators') && request.method === 'POST') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const incubator: Incubator = request.body;
        incubator.id = incubators.length + 1;
        incubators.push(incubator);
        return ok(incubator);
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))
    // call materialize and dematerialize to ensure delay even if an error
    // is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // private helper functions

    function ok(body) {
      return of(new HttpResponse({status: 200, body}));
    }

    function unauthorised() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function error(message) {
      return throwError({status: 400, error: {message}});
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
