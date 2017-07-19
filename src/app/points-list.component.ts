import { Component, OnInit } from '@angular/core';

import { Point } from './point';
import { Points } from './points';

@Component({
  selector:    'point-list',
  templateUrl: './point-list.component.html'
})
export class PointListComponent implements OnInit {
//    points: Point[];
    points: any;

    constructor() { }

    ngOnInit() {
        this.points = Points;
    }

    selectPoint(point: Point) {
        console.log(point);
    }
}
