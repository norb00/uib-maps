import { Component, OnInit } from '@angular/core';
import { RacersService } from '../../racers.service';


@Component({
  selector: 'app-racers-page',
  templateUrl: './racers-page.component.html',
  styleUrls: ['./racers-page.component.css']
})
export class RacersPageComponent implements OnInit {

    private racers;
    constructor(private racersService: RacersService) {
        this.racers = racersService.getRacers();
    }

    ngOnInit() {
    }

    editRacer(racer) {
        console.log('Edit racer: ', racer);
    }

    selectRacer(racer) {
        console.log('Select racer: ', racer);
    }

    addRacer(racer) {
        console.log('Add racer: ', racer);
        this.racersService.newRacer(racer);
    }

    deleteRacer(racer) {
        console.log('Delete racer: ', racer);
        this.racersService.deleteRacer(racer);
    }
}
