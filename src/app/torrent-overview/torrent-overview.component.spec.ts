import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TorrentOverviewComponent} from './torrent-overview.component';
import {TransmissionApiService} from '../transmission-api/transmission-api.service';
import {MockTransmissionClientService} from '../transmission-api/mock-transmission-client.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HumanDataSizePipe} from '../common/human-data-size.pipe';
import {HumanDataSpeedPipe} from '../common/human-data-speed.pipe';
import {HumanTimePipe} from '../common/human-time.pipe';
import {PercentPipe} from '../common/percent.pipe';

describe('TorrentOverviewComponent', () => {
  let component: TorrentOverviewComponent;
  let fixture: ComponentFixture<TorrentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TorrentOverviewComponent,
        HumanDataSizePipe,
        HumanDataSpeedPipe,
        HumanTimePipe,
        PercentPipe
      ],
      imports: [
        FontAwesomeModule
      ],
      providers: [
        { provide: TransmissionApiService, useClass: MockTransmissionClientService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
