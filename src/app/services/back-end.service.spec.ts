import { TestBed } from '@angular/core/testing';

import { BackendService } from './back-end.service';

describe('BackEndService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
