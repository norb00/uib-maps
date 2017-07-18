import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { DirectionsMapDirective } from './google-map.directive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCLYQSecfjnLhKNydpPtkXjS_KK5c7zKFo', libraries: ['places'] }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
