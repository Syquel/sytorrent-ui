import {TestBed} from '@angular/core/testing';

import {TransmissionClientService} from './transmission-client.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TransmissionClientService', () => {
  let service: TransmissionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TransmissionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
