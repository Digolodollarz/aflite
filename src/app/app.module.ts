import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {ImportsModule} from './imports.module';
import {AuthModule} from './auth/auth.module';
import {fakeBackendProvider} from './_helpers/fack-backend';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './_helpers/error-interceptor';
import {HomeComponent} from './home/home.component';
import {InfoModule} from './info/info.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ProfileComponent} from './profile/profile.component';
import {ArtistComponent} from './profile/artist/artist.component';
import {VideosComponent} from './profile/videos/videos.component';
import {SongsComponent} from './profile/songs/songs.component';
import {PracticeComponent} from './profile/practice/practice.component';
import {ReadingComponent} from './profile/reading/reading.component';
import {MentoringComponent} from './profile/mentoring/mentoring.component';
import {MeetingComponent} from './profile/meeting/meeting.component';
import {LearnComponent} from './profile/learn/learn.component';
import {ProducerComponent} from './profile/producer/producer.component';
import {ProducersComponent} from './profile/producers/producers.component';
import {AddSongModalComponent} from './profile/songs/add-song-modal/add-song-modal.component';
import { IncubationComponent } from './incubation/incubation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ArtistComponent,
    VideosComponent,
    SongsComponent,
    PracticeComponent,
    ReadingComponent,
    MentoringComponent,
    MeetingComponent,
    LearnComponent,
    ProducerComponent,
    ProducersComponent,
    AddSongModalComponent,
    IncubationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    ImportsModule,
    MDBBootstrapModule.forRoot(),
    AuthModule,
    InfoModule,
  ],
  entryComponents: [AddSongModalComponent],
  providers: [
    fakeBackendProvider,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
