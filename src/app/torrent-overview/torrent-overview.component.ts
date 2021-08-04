import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';
import {faChevronDown, faChevronUp, faDownload, faHourglass, faInfo, faTrash, faUpload, faUser} from '@fortawesome/free-solid-svg-icons';
import {SessionInfo, TorrentInfo, TorrentStatus} from '../transmission-api/transmission-api-types';
import {TransmissionApiService} from '../transmission-api/transmission-api.service';

type TorrentInfoOverview =
  Pick<
    TorrentInfo,
    'id' | 'uploadedEver' | 'seedRatioLimit' | 'leftUntilDone' | 'totalSize' | 'status' | 'peersConnected' | 'rateDownload' | 'eta' | 'rateUpload' | 'error' |
    'errorString' | 'name' | 'metadataPercentComplete' | 'peersSendingToUs' | 'percentDone'
    >;

@Component({
  selector: 'app-torrent-overview',
  templateUrl: './torrent-overview.component.html',
  styleUrls: ['./torrent-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TorrentOverviewComponent implements OnInit {

  refreshMsInterval: number = 10;
  torrentInfos$: Observable<TorrentInfoOverview[]> = of();
  sessionInfo$: Observable<SessionInfo> = of();

  readonly downloadIcon = faChevronDown;
  readonly uploadIcon = faChevronUp;
  readonly downloadSizeIcon = faDownload;
  readonly uploadSizeIcon = faUpload;
  readonly etaIcon = faHourglass;
  readonly peerIcon = faUser;
  readonly infoIcon = faInfo;
  readonly deleteIcon = faTrash;

  readonly progressClassLookup: Record<TorrentStatus, string> = {
    [TorrentStatus.Checking]: 'progress-checking',
    [TorrentStatus.CheckQueued]: 'progress-queued',
    [TorrentStatus.Downloading]: 'progress-downloading',
    [TorrentStatus.DownloadQueued]: 'progress-queued',
    [TorrentStatus.Seeding]: 'progress-seeding',
    [TorrentStatus.SeedQueued]: 'progress-queued',
    [TorrentStatus.Stopped]: 'progress-stopped'
  };

  constructor(private readonly torrentApi: TransmissionApiService) { }

  ngOnInit(): void {
    this.torrentInfos$ =
      timer(0, this.refreshMsInterval)
        .pipe(
          switchMap(() =>
            this.torrentApi.getTorrents(
              'id', 'uploadedEver', 'seedRatioLimit', 'leftUntilDone', 'totalSize', 'status', 'peersConnected', 'rateDownload', 'eta', 'rateUpload', 'error',
              'errorString', 'name', 'metadataPercentComplete', 'peersSendingToUs', 'percentDone'
            )
          )
        );

    this.sessionInfo$ =
      this.torrentApi
        .getSessionInfo()
        .pipe(
          shareReplay(1)
        );
  }

  getTorrentId(index: number, item: TorrentInfoOverview): number {
    return item.id;
  }

  removeTorrent(torrentInfo: TorrentInfoOverview): void {
    this.torrentApi
      .removeTorrent(torrentInfo, false)
      .subscribe(
        value => value,
        error => console.error('Failed to delete torrent ' + torrentInfo.id.toString(), error)
      );
  }

}
