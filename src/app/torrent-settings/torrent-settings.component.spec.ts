import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TorrentSettingsComponent} from './torrent-settings.component';
import {TransmissionApiService} from '../transmission-api/transmission-api.service';
import {MockTransmissionClientService} from '../transmission-api/mock-transmission-client.service';

describe('TorrentSettingsComponent', () => {
  let component: TorrentSettingsComponent;
  let fixture: ComponentFixture<TorrentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentSettingsComponent ],
      providers: [
        { provide: TransmissionApiService, useClass: MockTransmissionClientService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
