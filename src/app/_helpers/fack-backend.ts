import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {User} from '../auth/user';
import {Incubator} from '../shared/incubator';
import {Meeting} from '../shared/meeting';
import {VideoPitch} from '../shared/video-pitch';
import {Song} from '../shared/song';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const defaultUsers: User[] = [
      {id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'},
      {id: 2, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User'},
      {id: 3, username: 'N01310389L', password: '210117483', firstName: 'Edmore M', lastName: 'Gonese'},
    ];

    const defaultIncubators: Incubator[] = [
      {id: 1, name: 'John Nkomo IRL', photoUrl: '/assets/img/card.jpg'},
      {id: 2, name: 'James le Doug', photoUrl: '/assets/img/card.jpg'},
      {id: 3, name: 'David la-Grange', photoUrl: '/assets/img/card.jpg'},
      {id: 4, name: 'Romain daVinci', photoUrl: '/assets/img/card.jpg'},
      {id: 5, name: 'Martin Luther King', photoUrl: '/assets/img/card.jpg'},
    ];

    const defaultMeetings: Meeting[] = [
      {
        id: 1,
        agenda: 'To be or not to be',
        venue: 'virtual',
        date: new Date('26 Dec 18'),
        startTime: new Date('11 Dec 2018 09:00'),
        endTime: new Date('11 Dec 2018 15:00'),
        type: 'CEO_CEO',
        chair: defaultUsers[1]
      },
      {
        id: 2,
        agenda: 'Deliberating on the implementation of the thing',
        venue: 'virtual',
        date: new Date('26 Dec 18'),
        startTime: new Date('11 Dec 2018 09:00'),
        endTime: new Date('11 Dec 2018 15:00'),
        type: 'CEO_CEO',
        chair: defaultUsers[1]
      },
      {
        id: 3,
        agenda: 'A new meeting to be seen',
        venue: 'virtual',
        date: new Date('26 Dec 18'),
        startTime: new Date('11 Dec 2018 09:00'),
        endTime: new Date('11 Dec 2018 15:00'),
        type: 'CEO_CEO',
        chair: defaultUsers[1]
      },
      {
        id: 4,
        agenda: 'The first meeting to decide on what to actually do',
        venue: 'virtual',
        date: new Date('26 Dec 18'),
        startTime: new Date('11 Dec 2018 09:00'),
        endTime: new Date('11 Dec 2018 15:00'),
        type: 'CEO_CEO',
        chair: defaultUsers[1]
      },
      {
        id: 5,
        agenda: 'Hmm, this is a lorem meeting',
        venue: 'virtual',
        date: new Date('26 Dec 18'),
        startTime: new Date('11 Dec 2018 09:00'),
        endTime: new Date('11 Dec 2018 15:00'),
        type: 'CEO_CEO',
        chair: defaultUsers[1]
      },
    ];

    const defaultVideos: VideoPitch[] =
      [
        {id: 0, artist: defaultUsers[0], fileUrl: 'https://www.youtube.com/embed/eZsxXJy6_sY'},
        {id: 1, artist: defaultUsers[1], fileUrl: 'https://www.youtube.com/embed/eZsxXJy6_sY'},
        {id: 2, artist: defaultUsers[2], fileUrl: 'https://www.youtube.com/embed/eZsxXJy6_sY'},
      ];

    const defaultSongs: Song[] =
      [
        {
          id: 0,
          title: 'Song',
          artist: defaultUsers[0],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 1,
          title: 'Song 1',
          artist: defaultUsers[1],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 2,
          title: 'Song 2',
          artist: defaultUsers[2],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 3,
          title: 'Song 3',
          artist: defaultUsers[3],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 4,
          title: 'Song 4',
          artist: defaultUsers[4],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 5,
          title: 'Song 5',
          artist: defaultUsers[5],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 6,
          title: 'Song 6',
          artist: defaultUsers[6],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 7,
          title: 'Song 7',
          artist: defaultUsers[7],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 8,
          title: 'Song 8',
          artist: defaultUsers[8],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
        {
          id: 9,
          title: 'Song 9',
          artist: defaultUsers[9],
          producer: defaultUsers[0],
          date: new Date(),
          fileUrl: '',
          thumbUrl: '/assets/img/bmw.jpg'
        },
      ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate - public
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;
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
        const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;
        return ok(users);
      }

      // get all incubators
      if (request.url.endsWith('/incubators') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const incubators = JSON.parse(localStorage.getItem('incubators')) || defaultIncubators;
        return ok(incubators);
      }
      // add incubator
      if (request.url.endsWith('/incubators') && request.method === 'POST') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const incubator: Incubator = request.body;
        const incubators = JSON.parse(localStorage.getItem('incubators')) || defaultIncubators;
        incubator.id = incubators.length + 1;
        incubators.push(incubator);
        localStorage.setItem('incubators', incubators);
        return ok(incubator);
      }


      // get all meetings
      if (request.url.endsWith('/meetings') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const meetings = JSON.parse(localStorage.getItem('meetings')) || defaultMeetings;
        return ok(meetings);
      }
      // get a meeting
      if (request.url.match('/meetings/\\d+') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const mId = request.url.substr(request.url.lastIndexOf('/') + 1);
        const meetings = JSON.parse(localStorage.getItem('meetings')) || defaultMeetings;
        return ok(meetings[mId]);
      }

      // Videos Tings
      if (request.url.endsWith('/videos/pitch') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const userId = request.url.substring(request.url.lastIndexOf('users/') + 6, request.url.lastIndexOf('/videos'));
        const videos = JSON.parse(localStorage.getItem('videos')) || defaultVideos;
        return ok(videos[userId - 1]);
      }
      if (request.url.endsWith('/videos/pitch') && request.method === 'POST') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const userId = request.url.substring(request.url.lastIndexOf('users/') + 6, request.url.lastIndexOf('/videos'));
        const userIdInt = Number.parseInt(userId, 10);
        let videos = JSON.parse(localStorage.getItem('videos')) || defaultVideos;
        const exists = videos.some(_pitch => _pitch.artist.id === userIdInt);
        if (exists) {
          videos = videos.map(_video => {
            if (_video.artist.id === userIdInt) {
              _video.date = Date();
              _video.fileUrl = request.body.fileUrl;
              _video.title = request.body.title;
              console.log('That was old');
              return _video;
            } else {
              return _video;
            }
          });
        } else {
          const users: User[] = JSON.parse(localStorage.getItem('users')) || defaultUsers;
          const video: VideoPitch = request.body;
          video.artist = users.find(_user => _user.id === userIdInt);
          videos.push(video);
          console.log('THat was new');
        }
        localStorage.setItem('videos', JSON.stringify(videos));
        return ok(videos.find(_video => _video.artist.id === userIdInt));
      }
      // Songs, Trey
      if (request.url.endsWith('/songs') && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const songs = JSON.parse(localStorage.getItem('songs')) || defaultSongs;
        return ok(songs);
      }
      if (request.url.endsWith('/songs') && request.method === 'POST') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        const songs = JSON.parse(localStorage.getItem('songs')) || defaultSongs;
        const song: Song = request.body;
        let index = 0;
        songs.forEach(_song => index = index > _song.id ? index : _song.id);
        song.id = index + 1;
        song.date = song.date || new Date();
        songs.push(song);
        localStorage.setItem('songs', JSON.stringify(songs));
        return ok(songs[songs.length - 1]);
      }
      if (request.url.endsWith('/songs') && request.method === 'PUT') {
        if (!isLoggedIn) {
          return unauthorised();
        }
        console.log('Erndemboiz');
        const songs = JSON.parse(localStorage.getItem('songs')) || defaultSongs;
        const song: Song = request.body;
        const index = songs.findIndex(_song => _song.id === song.id);
        if (!index) {
          error('Unknown song');
        }
        song.date = song.date || new Date();
        songs[index] = song;
        localStorage.setItem('songs', JSON.stringify(songs));
        return ok(songs[songs.length - 1]);
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
