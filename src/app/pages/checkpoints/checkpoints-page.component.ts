import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Point } from '../../point';
import { Points } from '../../points';
import { PointSelectComponent } from '../../page-components/point-select/point-select.component';

@Component({
  selector: 'app-checkpoints-page',
  templateUrl: './checkpoints-page.component.html',
  styleUrls: ['./checkpoints-page.component.css']
})
export class CheckpointsPageComponent implements OnInit {

    private points: any;
    constructor(private modalService: NgbModal) {
        }

    ngOnInit() {
        this.points = Points;
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

}
