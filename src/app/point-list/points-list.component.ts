import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';

import { Point } from '../point';
import { Points } from '../points';
import { DirectionsMapDirective } from '../google-map.directive';
import { NavigationService } from '../navigation.service';

@Component({
  selector:    'point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {
//    points: Point[];
    @Output() onPointSelected: EventEmitter<Point> = new EventEmitter();
    points: any;
    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
    constructor(private navigationService: NavigationService) { }

    ngOnInit() {
        this.points = Points;
    }

    selectPoint(point: Point) {
        this.navigationService.selectEndPoint(point);
    }

}
