import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-ub-maps',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // google maps zoom level
  public zoom: number;
  public title: string = 'My first angular2-google-maps project';
  public lat: number;
  public lng: number;
  public searchControl: FormControl;

  public origin = { longitude: 4.333, lattitude: -1.2222 };  // its a example aleatory position
  public destination = { longitude: 22.311, lattitude: -0.123 };  // its a example aleatory position

  public showMap: boolean;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    // this.map.triggerResize();
    // set google maps defaults
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;
    this.showMap = true;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
//    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //   types: ['address']
      // });
      // autocomplete.addListener('place_changed', () => {
      //   this.ngZone.run(() => {
      //     // get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //     // verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }

      //     // set latitude, longitude and zoom
      //     this.lat = place.geometry.location.lat();
      //     this.lng = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}