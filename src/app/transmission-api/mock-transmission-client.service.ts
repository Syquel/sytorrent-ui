import {Injectable} from '@angular/core';
import {TransmissionApiService} from './transmission-api.service';
import {
  BlocklistUpdateResult,
  FileTorrentCreationOptions,
  FreeSpaceResult,
  MetainfoTorrentCreationOptions,
  PortCheckingResult,
  QueueMovementAction,
  RenameTorrentResult,
  SessionInfo,
  SessionStats,
  TorrentAccessorResult,
  TorrentInfo,
  TorrentSettings,
  TransmissionResponse
} from './transmission-api-types';
import {Observable, of} from 'rxjs';
import {MockData} from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class MockTransmissionClientService extends TransmissionApiService {

  private readonly sessionInfoResponse: TransmissionResponse<SessionInfo> = {'arguments':{'alt-speed-down':6000,'alt-speed-enabled':false,'alt-speed-time-begin':540,'alt-speed-time-day':127,'alt-speed-time-enabled':false,'alt-speed-time-end':1020,'alt-speed-up':50,'blocklist-enabled':false,'blocklist-size':0,'blocklist-url':'http://www.example.com/blocklist','cache-size-mb':64,'config-dir':'/var/lib/transmission-daemon/.config/transmission-daemon','dht-enabled':true,'download-dir':'/mnt/systore/Transmission','download-queue-enabled':true,'download-queue-size':10,'encryption':'preferred','idle-seeding-limit':60,'idle-seeding-limit-enabled':true,'incomplete-dir':'/mnt/systore/Transmission','incomplete-dir-enabled':false,'lpd-enabled':true,'peer-limit-global':1600,'peer-limit-per-torrent':400,'peer-port':54892,'peer-port-random-on-start':true,'pex-enabled':true,'port-forwarding-enabled':true,'queue-stalled-enabled':true,'queue-stalled-minutes':2,'rename-partial-files':true,'rpc-version':16,'rpc-version-minimum':1,'script-torrent-done-enabled':false,'script-torrent-done-filename':'','seed-queue-enabled':true,'seed-queue-size':10,'seedRatioLimit':1.1000,'seedRatioLimited':true,'speed-limit-down':100,'speed-limit-down-enabled':false,'speed-limit-up':100,'speed-limit-up-enabled':false,'start-added-torrents':true,'trash-original-torrent-files':false,'units':{'memory-bytes':1024,'memory-units':['KiB','MiB','GiB','TiB'],'size-bytes':1000,'size-units':['kB','MB','GB','TB'],'speed-bytes':1000,'speed-units':['kB/s','MB/s','GB/s','TB/s']},'utp-enabled':true,'version':'3.00 (bb6b5a062e)'},'result':'success'};

  private readonly torrentAccessorResponses: TransmissionResponse<TorrentAccessorResult>[] = MockData.TORRENT_MOCK_DATA_FULL;
  private torrentAccessorResponsesIndex: number = -1;

  override addTorrent(torrentCreationOptions: FileTorrentCreationOptions | MetainfoTorrentCreationOptions): Observable<TorrentInfo> {
    void torrentCreationOptions;

    return of(this.torrentAccessorResponses[0].arguments.torrents[0]);
  }

  override changeTorrentQueuePosition(torrentInfo: TorrentInfo, queueMovement: QueueMovementAction): Observable<void> {
    void torrentInfo;
    void queueMovement;

    return of();
  }

  override checkPeerPort(): Observable<PortCheckingResult> {
    return of({'port-is-open': true});
  }

  override getFreeSpace(path: string): Observable<FreeSpaceResult> {
    return of({path: path, 'size-bytes': 100000});
  }

  override getSessionInfo(): Observable<SessionInfo> {
    return of(this.sessionInfoResponse.arguments);
  }

  override getSessionStats(): Observable<SessionStats> {
    const torrentCount = this.torrentAccessorResponses.length;

    return of({
      activeTorrentCount: torrentCount, pausedTorrentCount: 0, torrentCount: torrentCount, downloadSpeed: 0, uploadSpeed: 0,
      'cumulative-stats': {sessionCount: 0, secondsActive: 0, filesAdded: 1, downloadedBytes: 0, uploadedBytes: 0},
      'current-stats': {sessionCount: 0, secondsActive: 0, filesAdded: 1, downloadedBytes: 0, uploadedBytes: 0}
    });
  }

  override getTorrent(torrentInfo: TorrentInfo): Observable<TorrentInfo> {
    void torrentInfo;

    return of(this.torrentAccessorResponses[0].arguments.torrents[0]);
  }

  override getTorrents<T extends keyof TorrentInfo>(...fields: T[]): Observable<Pick<TorrentInfo, T>[]> {
    void fields;

    if (this.torrentAccessorResponsesIndex >= this.torrentAccessorResponses.length - 1) {
      this.torrentAccessorResponsesIndex = -1;
    }

    this.torrentAccessorResponsesIndex++;

    return of(this.torrentAccessorResponses[this.torrentAccessorResponsesIndex].arguments.torrents);
  }

  override modifySessionInfo(sessionInfo: Partial<SessionInfo>): Observable<void> {
    void sessionInfo;

    return of();
  }

  override modifyTorrent(torrentInfo: TorrentInfo, torrentSettings: Partial<TorrentSettings>): Observable<void> {
    void torrentInfo;
    void torrentSettings;

    return of();
  }

  override moveTorrent(torrentInfo: TorrentInfo, newLocation: string, move: boolean): Observable<void> {
    void torrentInfo;
    void newLocation;
    void move;

    return of();
  }

  override moveTorrents(torrentInfos: TorrentInfo[], newLocation: string, move: boolean): Observable<void> {
    void torrentInfos;
    void newLocation;
    void move;

    return of();
  }

  override reannounceTorrent(torrentInfo: TorrentInfo): Observable<void> {
    void torrentInfo;

    return of();
  }

  override reannounceTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    void torrentInfos;

    return of();
  }

  override removeTorrent(torrentInfo: Pick<TorrentInfo, 'id'>, deleteLocalData: boolean): Observable<void> {
    void torrentInfo;
    void deleteLocalData;

    return of();
  }

  override removeTorrents(torrentInfos: Pick<TorrentInfo, 'id'>[], deleteLocalData: boolean): Observable<void> {
    void torrentInfos;
    void deleteLocalData;

    return of();
  }

  override renameTorrent(torrentInfo: TorrentInfo, path: string, newName: string): Observable<RenameTorrentResult> {
    return of({id: torrentInfo.id, name: newName, path: path});
  }

  override shutdown(): Observable<void> {
    return of();
  }

  override startTorrent(torrentInfo: TorrentInfo): Observable<void> {
    void torrentInfo;

    return of();
  }

  override startTorrentNow(torrentInfo: TorrentInfo): Observable<void> {
    void torrentInfo;

    return of();
  }

  override startTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    void torrentInfos;

    return of();
  }

  override startTorrentsNow(torrentInfos: TorrentInfo[]): Observable<void> {
    void torrentInfos;

    return of();
  }

  override stopTorrent(torrentInfo: TorrentInfo): Observable<void> {
    void torrentInfo;

    return of();
  }

  override stopTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    void torrentInfos;

    return of();
  }

  override updateBlocklist(): Observable<BlocklistUpdateResult> {
    return of({'blocklist-size': 0});
  }

  override verifyTorrent(torrentInfo: TorrentInfo): Observable<void> {
    void torrentInfo;

    return of();
  }

  override verifyTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    void torrentInfos;

    return of();
  }

}
