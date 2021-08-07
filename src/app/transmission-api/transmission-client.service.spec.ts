import {TestBed} from '@angular/core/testing';

import {TransmissionClientService} from './transmission-client.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigService} from '../app-config/app-config.service';
import {MockConfigService} from '../app-config/mock-config.service';

describe('TransmissionClientService', () => {
  let service: TransmissionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });
    service = TestBed.inject(TransmissionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
