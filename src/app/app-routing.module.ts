import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './info/about/about.component';
import {PrivacyComponent} from './info/privacy/privacy.component';
import {ContactComponent} from './info/contact/contact.component';
import {ProfileComponent} from './profile/profile.component';
import {LearnComponent} from './profile/learn/learn.component';
import {MeetingComponent} from './profile/meeting/meeting.component';
import {MentoringComponent} from './profile/mentoring/mentoring.component';
import {PracticeComponent} from './profile/practice/practice.component';
import {ReadingComponent} from './profile/reading/reading.component';
import {SongsComponent} from './profile/songs/songs.component';
import {VideosComponent} from './profile/videos/videos.component';
import {ProducersComponent} from './profile/producers/producers.component';
import {TeamComponent} from './info/team/team.component';
import {IncubationComponent} from './incubation/incubation.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'incubation',
    component: IncubationComponent
  },
  {
    path: 'dashboard',
    component: ProfileComponent,
    children: [
      {
        path: 'learn',
        component: LearnComponent,
      },
      {
        path: 'meeting',
        component: MeetingComponent,
      },
      {
        path: 'mentoring',
        component: MentoringComponent,
      },
      {
        path: 'practice',
        component: PracticeComponent,
      },
      {
        path: 'reading',
        component: ReadingComponent,
      },
      {
        path: 'songs',
        component: SongsComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      },
      {
        path: 'producer',
        component: ProducersComponent,
      },
    ]
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
