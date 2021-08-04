import { TestBed } from '@angular/core/testing';

import { TransmissionClientService } from './transmission-client.service';

describe('TransmissionClientService', () => {
  let service: TransmissionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmissionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
