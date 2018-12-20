import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PrivacyComponent} from './privacy/privacy.component';
import { TeamComponent } from './team/team.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [AboutComponent, ContactComponent, PrivacyComponent, TeamComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [AboutComponent, ContactComponent, PrivacyComponent, TeamComponent]
})
export class InfoModule {
}
