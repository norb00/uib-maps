import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Input, Output, NgZone } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { Point, Marker } from '../../data-types';

import {} from '@types/googlemaps';

declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-point-select',
  templateUrl: './point-select.component.html',
  styleUrls: ['./point-select.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class PointSelectComponent implements OnInit {
    public zoom: number;
    public markers: Marker[];
    public i: any;
    public m: any;

    @Input() point: Point;

    @ViewChild(AgmMap) map: AgmMap;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private gmapsApi: GoogleMapsAPIWrapper,
        private _elementRef: ElementRef,
        public activeModal: NgbActiveModal
    ) {
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
                label: 'A',
                draggable: true
            },
            {
                lat: 51.373858,
                lng: 7.215982,
                label: 'B',
                draggable: false
            },
            {
                lat: 51.723858,
                lng: 7.895982,
                label: 'C',
                draggable: true
            }
        ];
    }

    ngOnInit() {
        this.zoom = 10;

    }

    markerDragEnd(m: Marker, $event: any) {
        console.log('dragEnd', m, $event);
        this.point.lat = $event.coords.lat;
        this.point.lng = $event.coords.lng;
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: any) {
        console.log('Map clicked', $event);
        this.markers.push({
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: true
        });
    }

}

