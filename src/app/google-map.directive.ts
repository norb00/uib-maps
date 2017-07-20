import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output } from '@angular/core';
import { NavigationService } from './navigation.service';
import {} from '@types/googlemaps';

declare var google: any;

@Directive({
    selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
    @Input() origin: any;
    @Input() destination: any;
    @Input() originPlaceId: any;
    @Input() destinationPlaceId: any;
    @Input() waypoints: any;
    @Input() directionsDisplay: any;
    @Input() estimatedTime: any;
    @Input() estimatedDistance: any;

    private latLngA: any;
    private latLngB: any;

    constructor(
        private gmapsApi: GoogleMapsAPIWrapper,
        private navigationService: NavigationService
    ) {
        // navigationService.startPointSelected$.subscribe(
        //     point => {
        //         console.log('GMAP SERVICE start', point);
        //         this.latLngA = { lat: point.lat, lng: point.lng };
        //     });

        // navigationService.endPointSelected$.subscribe(
        //     point => {
        //         console.log('GMAP SERVICE end', point);
        //         this.latLngB = { lat: point.lat, lng: point.lng };
        //         this.updateDirections(this.latLngA, this.latLngB);
        //     });
    }

    updateDirections() {
        this.gmapsApi.getNativeMap().then(map => {
            if (!this.origin || !this.destination) {
                return;
            }
            console.log('ROUTE', map, this.origin, this.destination);

            const directionsService = new google.maps.DirectionsService;
            const me = this;

            const latLngA = new google.maps.LatLng({ lat: this.origin.lattitude, lng: this.origin.longitude });
            const latLngB = new google.maps.LatLng({ lat: this.destination.lattitude, lng: this.destination.longitude });
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 8,
                    strokeOpacity: 0.7,
                    strokeColor: '#00468c'
                }
            });
            this.directionsDisplay.setDirections({ routes: [] });
            directionsService.route({
                origin: latLngA,
                destination: latLngB,
                avoidHighways: false,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
                // travelMode: 'DRIVING'
            }, function (response: any, status: any) {
                if (status === 'OK') {
                    console.log(response);
                    me.directionsDisplay.setDirections(response);
                    map.setZoom(30);
                    console.log(me.getcomputeDistance (latLngA, latLngB));
                    const point = response.routes[0].legs[0];
                    me.estimatedTime = point.duration.text;
                    me.estimatedDistance = point.distance.text;
                    console.log(me.estimatedTime);
                    console.log('Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')');

                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        });

    }

    private getcomputeDistance(latLngA: any, latLngB: any) {
        return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
    }
}
