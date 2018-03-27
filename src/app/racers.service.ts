import { Injectable } from '@angular/core';
import { Racer } from './data-types';
import { race } from 'q';

@Injectable()
export class RacersService {

    private racers: Racer[];
    constructor() {
        this.racers = [
            { id: 1, name: 'Hanna' },
            { id: 2, name: 'Hédi' },
            { id: 3, name: 'Balu' },
            { id: 4, name: 'KisBalu' },
            { id: 5, name: 'HajdiG' },
            { id: 6, name: 'Bugi' }
        ];
    }

    getRacers() {
        return this.racers;
    }

    getRacer(id: number) {
        return this.racers.find((racer) => {
            return racer.id === id;
        })
    }

    deleteRacer(racer: Racer) {
        const index = this.racers.indexOf(racer);
        this.racers.splice(index, 1);
        // this.racers.find((racer, index) => {
        //     if (racer.id === racerId) {
        //         this.racers.splice(index, 1);
        //     };
        // });
    }

    newRacer(newRacerName: string) {
        const newId = this.racers[this.racers.length - 1].id + 1;
        this.racers.push({id: newId, name: newRacerName});
    }

    modifyRacer(racer: Racer) {
        const index = this.racers.indexOf(racer);
        this.racers[index].name = race.name;
    }
}
