import { TestBed } from '@angular/core/testing';

import { SubUserServiceService } from './sub-user-service.service';

describe('SubUserServiceService', () => {
  let service: SubUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
