import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TorrentOverviewComponent} from './torrent-overview.component';
import {TransmissionApiService} from '../transmission-api/transmission-api.service';
import {MockTransmissionClientService} from '../transmission-api/mock-transmission-client.service';
import {HumanDataSizePipe} from '../common/human-data-size.pipe';
import {HumanDataSpeedPipe} from '../common/human-data-speed.pipe';
import {HumanTimePipe} from '../common/human-time.pipe';
import {PercentPipe} from '../common/percent.pipe';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {ConfigService} from '../app-config/app-config.service';
import {MockConfigService} from '../app-config/mock-config.service';

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
        FontAwesomeTestingModule
      ],
      providers: [
        { provide: TransmissionApiService, useClass: MockTransmissionClientService },
        { provide: ConfigService, useClass: MockConfigService }
      ]
    }).compileComponents();
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
