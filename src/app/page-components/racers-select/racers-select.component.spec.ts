import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacersSelectComponent } from './racers-select.component';

describe('RacersSelectComponent', () => {
  let component: RacersSelectComponent;
  let fixture: ComponentFixture<RacersSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacersSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
