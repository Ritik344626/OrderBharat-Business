import { TestBed } from '@angular/core/testing';

import { StatustimerService } from './statustimer.service';

describe('StatustimerService', () => {
  let service: StatustimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatustimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
