import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionInfo} from '../transmission-api/transmission-api-types';
import {TransmissionClientService} from '../transmission-api/transmission-client.service';

@Component({
  selector: 'app-torrent-settings',
  templateUrl: './torrent-settings.component.html',
  styleUrls: ['./torrent-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TorrentSettingsComponent implements OnInit {

  sessionInfo$: Observable<SessionInfo> | null = null;

  constructor(private readonly torrentApi: TransmissionClientService) { }

  ngOnInit(): void {
    this.sessionInfo$ = this.torrentApi.getSessionInfo();
  }

}
