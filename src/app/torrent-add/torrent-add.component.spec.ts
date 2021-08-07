import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TorrentAddComponent} from './torrent-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../app-config/app-config.service';
import {MockConfigService} from '../app-config/mock-config.service';

describe('TorrentAddComponent', () => {
  let component: TorrentAddComponent;
  let fixture: ComponentFixture<TorrentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ TorrentAddComponent ],
      providers: [
        { provide: ConfigService, useClass: MockConfigService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
