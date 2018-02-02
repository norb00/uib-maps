import { TestBed, inject } from '@angular/core/testing';

import { CheckpointsService } from './checkpoints.service';

describe('CheckpointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckpointsService]
    });
  });

  it('should be created', inject([CheckpointsService], (service: CheckpointsService) => {
    expect(service).toBeTruthy();
  }));
});
