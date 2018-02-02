import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.css']
})
export class TimeSelectComponent implements OnInit, OnChanges {

    @Input() time;
    @Output() timeChange = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    setNow() {
        this.time = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        };

        this.timeChange.emit(this.time);

        console.log(this.time);
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
//        console.log('CHANGES: ', changes);
    }

}
