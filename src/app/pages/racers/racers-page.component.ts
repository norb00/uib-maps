import { Component, OnInit } from '@angular/core';
import { RacersService } from '../../racers.service';
import { Racer } from '../../data-types';

@Component({
  selector: 'app-racers-page',
  templateUrl: './racers-page.component.html',
  styleUrls: ['./racers-page.component.css']
})
export class RacersPageComponent implements OnInit {

    public racers;
    constructor(private racersService: RacersService) {
    }

    ngOnInit() {
        this.racers = this.racersService.getRacers();
    }

    editRacer(racer: Racer) {
        console.log('Edit racer: ', racer);
    }

    selectRacer(racer: Racer) {
        console.log('Select racer: ', racer);
    }

    addRacer(racerName: string) {
        console.log('Add racer: ', racerName);
        this.racersService.newRacer(racerName);
    }

    deleteRacer(racer: Racer) {
        console.log('Delete racer: ', racer);
        this.racersService.deleteRacer(racer);
    }

    modifyRacerName(racer: Racer, $event) {
        console.log(racer, $event);
    }
}
