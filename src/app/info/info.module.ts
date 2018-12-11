import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PrivacyComponent} from './privacy/privacy.component';

@NgModule({
  declarations: [AboutComponent, ContactComponent, PrivacyComponent],
  imports: [
    CommonModule,
    CommonModule,
  ],
  exports: [AboutComponent, ContactComponent, PrivacyComponent]
})
export class InfoModule {
}
