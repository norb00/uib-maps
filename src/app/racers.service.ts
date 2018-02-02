import { Injectable } from '@angular/core';

@Injectable()
export class RacersService {

    private racers: any[];
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

    deleteRacer(racer) {
        const index = this.racers.indexOf(racer);
        this.racers.splice(index, 1);
        // this.racers.find((racer, index) => {
        //     if (racer.id === racerId) {
        //         this.racers.splice(index, 1);
        //     };
        // });
    }

    newRacer(newRacer) {
        const newId = this.racers[this.racers.length - 1].id + 1;
        this.racers.push({id: newId, name: newRacer});
    }

}
