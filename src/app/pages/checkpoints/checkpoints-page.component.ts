import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { NgbModule, NgbModal, NgbActiveModal, NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { Point } from '../../point';
import { Points } from '../../points';
import { PointSelectComponent } from '../../page-components/point-select/point-select.component';
import { RacersSelectComponent } from '../../page-components/racers-select/racers-select.component';
import { RacersService } from '../../racers.service';
import { CheckpointsService } from '../../checkpoints.service';

@Component({
  selector: 'app-checkpoints-page',
  templateUrl: './checkpoints-page.component.html',
  styleUrls: ['./checkpoints-page.component.css']
})
export class CheckpointsPageComponent implements OnInit {

    private points: any;
    constructor(private modalService: NgbModal,
                private checkpointsService: CheckpointsService,
                private racersService: RacersService
            ) {}

    ngOnInit() {
        this.points = this.checkpointsService.getCheckpoints();
    }

    selectPoint(point: Point) {
        console.log(point);
        const pointSelectModal = this.modalService.open(PointSelectComponent, {
            size: 'lg',
            backdrop: 'static',
            windowClass: 'modal-custom'
        });
        pointSelectModal.componentInstance.point = point;
    }

    selectRacer(racer, point) {
        point.racer = racer.id;
        console.log('selectracer', racer, point);
    }

    setTime(time, point) {
        point.time = time;
        console.log('selectTime', time, point);
    }

    saveCheckpoints() {
        console.log(this.checkpointsService.getCheckpoints());
//        console.log(this.points);
    }
}
