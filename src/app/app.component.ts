import { Component, ElementRef, NgZone, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from './google-map.directive';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { NavigationService } from './navigation.service';
import { Point } from './point';

import { } from '@types/googlemaps';

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
    public title = 'My first angular2-google-maps project';
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
    public modalRef: any;
    public errorLog: any;


    public origin = { longitude: undefined, latitude: undefined };  // its a example aleatory position
    public destination = { longitude: undefined, latitude: undefined };  // its a example aleatory position

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
                this.errorLog = JSON.stringify(point);
            });

        navigationService.endPointSelected$.subscribe(
            point => {
                console.log('NAVIGATION SERVICE end', point);
                this.errorLog = JSON.stringify(point);
                this.destination = { latitude: point.lat, longitude: point.lng };
                // this.vc.destination = { latitude: point.lat, longitude: point.lng };

                // if (this.vc.directionsDisplay === undefined) {
                //   this.mapsAPILoader.load().then(() => {
                //     this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                //   });
                // }

                // this.vc.updateDirections();
                this.modalRef.close();
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

        const watchPositionOptions = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        if ('geolocation' in navigator) {

            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Position changed', position);
                this.errorLog = JSON.stringify(position);

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
            },
            (errorPosition) => {
                this.errorLog = JSON.stringify(errorPosition);
                console.log('Watch position error', errorPosition);
            },
            watchPositionOptions);
            //            navigator.geolocation.getCurrentPosition();
        } else {
            alert('NO GEOLOCATION :( ');
        }
    }

    private openList() {
        console.log('open list');
        this.modalRef = this.modalService.open(ModalComponent, {
            windowClass: 'modalw',
            size: 'lg'
        });
    }

    private showPosition() {
        const watchPositionOptions = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

       if ('geolocation' in navigator) {
           navigator.geolocation.getCurrentPosition((point) => {
               // alert(point);
               console.log(point);
           },
           (error) => {
               alert(error);
               // console.log(error);
           }, watchPositionOptions);
       }
    }

}
