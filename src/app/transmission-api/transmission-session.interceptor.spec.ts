import {TestBed} from '@angular/core/testing';

import {TransmissionSessionInterceptor} from './transmission-session.interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TransmissionSessionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TransmissionSessionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TransmissionSessionInterceptor = TestBed.inject(TransmissionSessionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
