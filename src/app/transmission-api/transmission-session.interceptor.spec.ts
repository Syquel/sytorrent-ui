import { TestBed } from '@angular/core/testing';

import { TransmissionSessionInterceptor } from './transmission-session.interceptor';

describe('TransmissionSessionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TransmissionSessionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TransmissionSessionInterceptor = TestBed.inject(TransmissionSessionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
