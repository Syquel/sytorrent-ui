import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TorrentSettingsComponent} from './torrent-settings.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TorrentSettingsComponent', () => {
  let component: TorrentSettingsComponent;
  let fixture: ComponentFixture<TorrentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ TorrentSettingsComponent ]
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
