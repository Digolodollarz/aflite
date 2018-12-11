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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ImportsModule,
    AuthModule,
  ],
  providers: [fakeBackendProvider,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
