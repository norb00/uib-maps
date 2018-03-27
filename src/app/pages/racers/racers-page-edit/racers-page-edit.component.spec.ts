import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacersPageEditComponent } from './racers-page-edit.component';

describe('RacersPageEditComponent', () => {
  let component: RacersPageEditComponent;
  let fixture: ComponentFixture<RacersPageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacersPageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacersPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
