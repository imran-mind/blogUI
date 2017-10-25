import { TestBed, inject } from '@angular/core/testing';

import { ArchivedService } from './archived.service';

describe('ArchivedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivedService]
    });
  });

  it('should be created', inject([ArchivedService], (service: ArchivedService) => {
    expect(service).toBeTruthy();
  }));
});
