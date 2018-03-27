import { Injectable } from '@angular/core';
import { Point } from './data-types';
import { Points } from './points';

@Injectable()
export class CheckpointsService {

    private points: any;
    constructor() {
        this.points = Points;
    }

    getCheckpoints(): Point[] {
        return this.points;
    }

    updateCheckpoint(point) {
        const i = this.points.indexOf(point);
        if (i === -1) {
            this.points.push(point);
        } else {
            this.points[i] = point;
        }
    }

    saveCheckpoints() {
        console.log('POINTS SAVED', this.points);
    }

}
