import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectionsMapDirective } from './google-map.directive';
import { PointListComponent } from './point-list/points-list.component';
import { NavigationService } from './navigation.service';
import { RacersService } from './racers.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ModalComponent } from './page-components/modal/modal.component';
import { MenuComponent } from './page-components/menu/menu.component';
import { NavigationPageComponent } from './pages/navigation/navigation-page.component';
import { RacersPageComponent } from './pages/racers/racers-page.component';
import { IndexPageComponent } from './pages/index/index-page.component';
import { CheckpointsPageComponent } from './pages/checkpoints/checkpoints-page.component';

import { ROUTING } from './app.routing';
import { PointSelectComponent } from './page-components/point-select/point-select.component';
import { CheckpointsService } from './checkpoints.service';
import { RacersSelectComponent } from './page-components/racers-select/racers-select.component';
import { TimeSelectComponent } from './page-components/time-select/time-select.component';
import { RacersPageEditComponent } from './pages/racers/racers-page-edit/racers-page-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        DirectionsMapDirective,
        PointListComponent,
        ModalComponent,
        MenuComponent,
        NavigationPageComponent,
        RacersPageComponent,
        IndexPageComponent,
        CheckpointsPageComponent,
        PointSelectComponent,
        RacersSelectComponent,
        TimeSelectComponent,
        RacersPageEditComponent
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
    providers: [ NavigationService, RacersService, CheckpointsService  ],
    entryComponents: [ ModalComponent, PointSelectComponent ],
    schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
})
export class AppModule { }
