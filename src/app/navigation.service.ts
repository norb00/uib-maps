import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Point } from './data-types';

@Injectable()
export class NavigationService {

    // Observable string sources
    private startPointSelected = new Subject<Point>();
    private endPointSelected = new Subject<Point>();

    // Observable string streams
    startPointSelected$ = this.startPointSelected.asObservable();
    endPointSelected$ = this.endPointSelected.asObservable();

    // Service message commands
    selectStartPoint(point: Point) {
        this.startPointSelected.next(point);
    }
    selectEndPoint(point: Point) {
        this.endPointSelected.next(point);
    }
}
