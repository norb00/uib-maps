import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RacersService } from '../../racers.service';
import { NgbModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-racers-select',
  templateUrl: './racers-select.component.html',
  styleUrls: ['./racers-select.component.css']
})
export class RacersSelectComponent implements OnInit {

    public racers;
    public selectedRacer = {name: 'Select'};

    @Input() racer;
    @Output() racerChange = new EventEmitter();

    constructor(private racersService: RacersService) {
        this.racers = this.racersService.getRacers();
    }

    ngOnInit() {
        if (this.racer) {
            this.selectedRacer = this.racersService.getRacer(this.racer.id);
        } else {
            this.selectedRacer =  { name : 'Select' };
        }
    }

    selectRacer(racer) {
        console.log('SSS: ', racer);
        this.selectedRacer = this.racersService.getRacer(racer.id);
        this.racerChange.emit(racer);
    }
}
