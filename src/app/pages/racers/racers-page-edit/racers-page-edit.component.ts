import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-racers-page-edit',
  templateUrl: './racers-page-edit.component.html',
  styleUrls: ['./racers-page-edit.component.css']
})
export class RacersPageEditComponent implements OnInit {

    @Input() racerName;
    constructor() { }

    ngOnInit() {
    }

}
