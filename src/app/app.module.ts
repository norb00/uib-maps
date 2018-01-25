import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectionsMapDirective } from './google-map.directive';
import { PointListComponent } from './point-list/points-list.component';
import { NavigationService } from './navigation.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ModalComponent } from './page-components/modal/modal.component';
import { MenuComponent } from './page-components/menu/menu.component';
import { NavigationPageComponent } from './pages/navigation/navigation-page.component';

import { ROUTING } from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    PointListComponent,
    ModalComponent,
    MenuComponent,
    NavigationPageComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCLYQSecfjnLhKNydpPtkXjS_KK5c7zKFo', libraries: ['places'] }),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTING
  ],
  providers: [ NavigationService ],
  entryComponents: [ ModalComponent ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
