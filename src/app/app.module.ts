import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { DirectionsMapDirective } from './google-map.directive';
import { PointListComponent } from './points-list.component';
import { NgbdModalContent } from './modal-content.component';
import { NavigationService } from './navigation.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    PointListComponent,
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCLYQSecfjnLhKNydpPtkXjS_KK5c7zKFo', libraries: ['places'] }),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ NavigationService ],
  entryComponents: [ NgbdModalContent ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
