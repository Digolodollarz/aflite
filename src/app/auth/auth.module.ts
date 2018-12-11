import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ImportsModule} from '../imports.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthService} from './auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './jwt-interceptor';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ImportsModule,
    FlexLayoutModule,
  ],
  providers: [AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})
export class AuthModule {
}
