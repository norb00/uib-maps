import { TestBed, inject } from '@angular/core/testing';

import { RacersService } from './racers.service';

describe('RacersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RacersService]
    });
  });

  it('should be created', inject([RacersService], (service: RacersService) => {
    expect(service).toBeTruthy();
  }));
});
