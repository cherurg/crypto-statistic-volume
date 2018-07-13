import { TestBed, inject } from '@angular/core/testing';

import { KolmogorovApiClientService } from './kolmogorov-api-client.service';

describe('KolmogorovApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KolmogorovApiClientService]
    });
  });

  it('should be created', inject([KolmogorovApiClientService], (service: KolmogorovApiClientService) => {
    expect(service).toBeTruthy();
  }));
});
