import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSelectComponent } from './point-select.component';

describe('PointSelectComponent', () => {
  let component: PointSelectComponent;
  let fixture: ComponentFixture<PointSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
