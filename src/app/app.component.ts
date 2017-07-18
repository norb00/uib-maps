import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from './google-map.directive';
import {} from '@types/googlemaps';

declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-ub-maps',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class AppComponent implements OnInit {
  // google maps zoom level
  public zoom: number;
  public title: string = 'My first angular2-google-maps project';
  public lat: number;
  public lng: number;
  public searchControl: FormControl;

  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedDistance: any;


  public origin = { longitude: 4.333, lattitude: -1.2222 };  // its a example aleatory position
  public destination = { longitude: 22.311, lattitude: -0.123 };  // its a example aleatory position

  public showMap: boolean;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild(AgmMap) map: AgmMap;

  @ViewChild('pickupInput')
  public pickupInputElementRef: ElementRef;

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild('scrollMe')
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;



  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef
  ) { }

  ngOnInit() {
    // this.map.triggerResize();
    // set google maps defaults
    this.zoom = 8;
    this.lat = 47.5011151657;
    this.lng = 19.0531965145;
    this.showMap = true;

    // create search FormControl
    this.searchControl = new FormControl();
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    // set current position
    //    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ['address']
      });

      let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ['address']
      });

      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');
    });
  }

  private setupPlaceChangedListener(autocomplete: any, mode: any) {
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // verify result
        if (place.geometry === undefined) {
          return;
        }
        if (mode === 'ORG') {
          this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          this.vc.originPlaceId = place.place_id;
        } else {
          // its a example aleatory position
          this.vc.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          this.vc.destinationPlaceId = place.place_id;
        }

        if (this.vc.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }

        // Update the directions
        this.vc.updateDirections();
        this.zoom = 12;
      });

    });

  }

  getDistanceAndDuration() {
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
  }

  scrollToBottom(): void {
    jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
  }
  private setPickUpLocation(place: any) {
    // verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    // set latitude, longitude and zoom
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }

}
