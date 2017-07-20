import { Component, ElementRef, NgZone, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from './google-map.directive';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './modal-content.component';
import { NavigationService } from './navigation.service';
import { Point } from './point';

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


  public origin = { longitude: 4.333, latitude: -1.2222 };  // its a example aleatory position
  public destination = { longitude: 22.311, latitude: -0.123 };  // its a example aleatory position

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
    private _elementRef: ElementRef,
    private modalService: NgbModal,
    private navigationService: NavigationService
  ) {
    // navigationService.endPointSelected$.subscribe(
    //   point => {
    //     console.log('NAVIGATION SERVICE ', point);
    //   });

        navigationService.startPointSelected$.subscribe(
            point => {
                console.log('NAVIGATION SERVICE start', point);
                this.origin = { latitude: point.lat, longitude: point.lng };
                // this.vc.origin = { latitude: point.lat, longitude: point.lng };
            });

        navigationService.endPointSelected$.subscribe(
            point => {
                console.log('NAVIGATION SERVICE end', point);
                this.destination = { latitude: point.lat, longitude: point.lng };
                // this.vc.destination = { latitude: point.lat, longitude: point.lng };

                // if (this.vc.directionsDisplay === undefined) {
                //   this.mapsAPILoader.load().then(() => {
                //     this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                //   });
                // }

                // this.vc.updateDirections();
              });
    }

  ngOnInit() {

    this.zoom = 8;

    // set current position
    this.setCurrentPosition();
    this.showMap = true;

    // create search FormControl
    this.searchControl = new FormControl();
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();


    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ['address']
      });

      const autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
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
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // verify result
        console.log(place);
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
        console.log('Position', position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;

        const point: Point = {
          id: 0,
          lat: this.lat,
          lng: this.lng,
          start: '',
          end: ''
        }

        this.navigationService.selectStartPoint(point);
      });
    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }

  private openList() {
    console.log('open list');
    const modalRef = this.modalService.open(NgbdModalContent, {
      windowClass: 'modalw',
      size: 'lg'
    });
  }

}
