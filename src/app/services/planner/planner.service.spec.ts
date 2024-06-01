import { TestBed } from '@angular/core/testing';

import { PlannerService } from './planner.service';

describe('PlannerServiceService', () => {
  let service: PlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
