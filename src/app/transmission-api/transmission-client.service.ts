import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AddTorrentRequest,
  AddTorrentResponse,
  BlocklistUpdateRequest,
  FileTorrentCreationOptions,
  FreeSpaceRequest,
  FreeSpaceResponse,
  FreeSpaceResult,
  MetainfoTorrentCreationOptions,
  MoveTorrentRequest,
  PortCheckingRequest,
  PortCheckingResponse,
  PortCheckingResult,
  QueueMovement,
  QueueMovementRequest,
  RemoveTorrentRequest,
  RenameTorrentRequest,
  RenameTorrentResult,
  SessionInfo,
  SessionInfoGetRequest,
  SessionInfoGetResponse,
  SessionInfoSetRequest,
  SessionStats,
  SessionStatsRequest,
  SessionStatsResponse,
  TORRENT_INFO_FIELDS,
  TorrentAccessorRequest,
  TorrentAccessorResponse,
  TorrentAction,
  TorrentActionRequest,
  TorrentInfo,
  TorrentMutatorRequest,
  TorrentSettings
} from './transmission-api-types';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TransmissionApiService} from './transmission-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransmissionClientService extends TransmissionApiService {

  private readonly apiUrl: string = 'https://torrent.sypi.boster.de/rpc';

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  override startTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    return this.requestTorrentAction('torrent-start', torrentInfos);
  }

  override startTorrent(torrentInfo: TorrentInfo): Observable<void> {
    return this.startTorrents([torrentInfo]);
  }

  override startTorrentsNow(torrentInfos: TorrentInfo[]): Observable<void> {
    return this.requestTorrentAction('torrent-start-now', torrentInfos);
  }

  override startTorrentNow(torrentInfo: TorrentInfo): Observable<void> {
    return this.startTorrentsNow([torrentInfo]);
  }

  override stopTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    return this.requestTorrentAction('torrent-stop', torrentInfos);
  }

  override stopTorrent(torrentInfo: TorrentInfo): Observable<void> {
    return this.stopTorrents([torrentInfo]);
  }

  override verifyTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    return this.requestTorrentAction('torrent-verify', torrentInfos);
  }

  override verifyTorrent(torrentInfo: TorrentInfo): Observable<void> {
    return this.verifyTorrents([torrentInfo]);
  }

  override reannounceTorrents(torrentInfos: TorrentInfo[]): Observable<void> {
    return this.requestTorrentAction('torrent-reannounce', torrentInfos);
  }

  override reannounceTorrent(torrentInfo: TorrentInfo): Observable<void> {
    return this.reannounceTorrents([torrentInfo]);
  }

  override modifyTorrent(torrentInfo: TorrentInfo, torrentSettings: Partial<TorrentSettings>): Observable<void> {
    const torrentMutatorRequest: TorrentMutatorRequest = {
      method: 'torrent-set',
      arguments: torrentSettings
    };

    return this.httpClient.post<void>(this.apiUrl, torrentMutatorRequest);
  }

  override getTorrents<T extends keyof TorrentInfo>(...fields: T[]): Observable<Pick<TorrentInfo, T>[]> {
    const torrentAccessorRequest: TorrentAccessorRequest = {
      method: 'torrent-get',
      arguments: {
        fields: fields,
        format: 'objects'
      }
    };

    return this.httpClient
      .post<TorrentAccessorResponse>(this.apiUrl, torrentAccessorRequest)
      .pipe(map(value => value.arguments.torrents));
  }

  override getTorrent(torrentInfo: TorrentInfo): Observable<TorrentInfo> {
    const torrentAccessorRequest: TorrentAccessorRequest = {
      method: 'torrent-get',
      arguments: {
        ids: [torrentInfo.id],
        fields: TORRENT_INFO_FIELDS,
        format: 'objects'
      }
    };

    return this.httpClient
      .post<TorrentAccessorResponse>(this.apiUrl, torrentAccessorRequest)
      .pipe(map(value => value.arguments.torrents[0]));
  }

  override addTorrent(torrentCreationOptions: FileTorrentCreationOptions | MetainfoTorrentCreationOptions): Observable<TorrentInfo> {
    const addTorrentRequest: AddTorrentRequest = {
      method: 'torrent-add',
      arguments: torrentCreationOptions
    };

    return this.httpClient
      .post<AddTorrentResponse>(this.apiUrl, addTorrentRequest)
      .pipe(
        map(response => {
          const responseArguments = response.arguments;
          if ('torrent-added' in responseArguments) {
            return responseArguments['torrent-added'];
          } else if ('torrent-duplicate' in responseArguments) {
            return responseArguments['torrent-duplicate'];
          } else {
            throw Error('Invalid response while adding new torrent: ' + JSON.stringify(response));
          }
        })
      );
  }

  override removeTorrents(torrentInfos: TorrentInfo[], deleteLocalData: boolean = false): Observable<void> {
    const removeTorrentRequest: RemoveTorrentRequest = {
      method: 'torrent-remove',
      arguments: {
        ids: torrentInfos.map(value => value.id),
        'delete-local-data': deleteLocalData
      }
    };

    return this.httpClient.post<void>(this.apiUrl, removeTorrentRequest);
  }

  override removeTorrent(torrentInfo: TorrentInfo, deleteLocalData: boolean = false): Observable<void> {
    return this.removeTorrents([torrentInfo], deleteLocalData);
  }

  override moveTorrents(torrentInfos: TorrentInfo[], newLocation: string, move: boolean = false): Observable<void> {
    const moveTorrentRequest: MoveTorrentRequest = {
      method: 'torrent-set-location',
      arguments: {
        ids: torrentInfos.map(value => value.id),
        location: newLocation,
        move: move
      }
    };

    return this.httpClient.post<void>(this.apiUrl, moveTorrentRequest);
  }

  override moveTorrent(torrentInfo: TorrentInfo, newLocation: string, move: boolean = false): Observable<void> {
    return this.moveTorrents([torrentInfo], newLocation, move);
  }

  override renameTorrent(torrentInfo: TorrentInfo, path: string, newName: string): Observable<RenameTorrentResult> {
    const renameTorrentRequest: RenameTorrentRequest = {
      method: 'torrent-rename-path',
      arguments: {
        ids: [torrentInfo.id],
        path: path,
        name: newName
      }
    };

    return this.httpClient.post<RenameTorrentResult>(this.apiUrl, renameTorrentRequest);
  }

  override modifySessionInfo(sessionInfo: Partial<SessionInfo>): Observable<void> {
    const sessionInfoSetRequest: SessionInfoSetRequest = {
      method: 'session-set',
      arguments: sessionInfo
    };

    return this.httpClient.post<void>(this.apiUrl, sessionInfoSetRequest);
  }

  override getSessionInfo(): Observable<SessionInfo> {
    const sessionInfoGetRequest: SessionInfoGetRequest = {
      method: 'session-get',
      arguments: {}
    };

    return this.httpClient
      .post<SessionInfoGetResponse>(this.apiUrl, sessionInfoGetRequest)
      .pipe(map(response => response.arguments as SessionInfo));
  }

  override getSessionStats(): Observable<SessionStats> {
    const sessionStatsRequest: SessionStatsRequest = {
      method: 'session-stats',
      arguments: undefined
    };

    return this.httpClient
      .post<SessionStatsResponse>(this.apiUrl, sessionStatsRequest)
      .pipe(map(response => response.arguments));
  }

  override updateBlocklist(): Observable<void> {
    const blocklistUpdateRequest: BlocklistUpdateRequest = {
      method: 'blocklist-update',
      arguments: undefined
    };

    return this.httpClient.post<void>(this.apiUrl, blocklistUpdateRequest);
  }

  override checkPeerPort(): Observable<PortCheckingResult> {
    const portCheckingRequest: PortCheckingRequest = {
      method: 'port-test',
      arguments: undefined
    };

    return this.httpClient
      .post<PortCheckingResponse>(this.apiUrl, portCheckingRequest)
      .pipe(map(response => response.arguments));
  }

  override changeTorrentQueuePosition(torrentInfo: TorrentInfo, queueMovement: QueueMovement): Observable<void> {
    const queueMovementRequest: QueueMovementRequest = {
      method: queueMovement,
      arguments: {
        ids: [torrentInfo.id]
      }
    };

    return this.httpClient.post<void>(this.apiUrl, queueMovementRequest);
  }

  override getFreeSpace(path: string): Observable<FreeSpaceResult> {
    const freeSpaceRequest: FreeSpaceRequest = {
      method: 'free-space',
      arguments: {
        path: path
      }
    };

    return this.httpClient
      .post<FreeSpaceResponse>(this.apiUrl, freeSpaceRequest)
      .pipe(map(response => response.arguments));
  }

  private requestTorrentAction(torrentAction: TorrentAction, torrentInfos: TorrentInfo[]): Observable<void> {
    const torrentActionRequest: TorrentActionRequest = {
      method: torrentAction,
      arguments: {ids: torrentInfos.map(value => value.id)}
    };

    return this.httpClient.post<void>(this.apiUrl, torrentActionRequest);
  }

}
