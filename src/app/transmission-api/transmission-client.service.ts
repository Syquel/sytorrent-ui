import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AddedTorrent,
  AddTorrentRequest,
  BlocklistUpdateRequest,
  BlocklistUpdateResult,
  DuplicateTorrent,
  FileTorrentCreationOptions,
  FreeSpaceRequest,
  FreeSpaceResult,
  MetainfoTorrentCreationOptions,
  MoveTorrentRequest,
  PortCheckingRequest,
  PortCheckingResult,
  QueueMovementAction,
  QueueMovementRequest,
  RemoveTorrentRequest,
  RenameTorrentRequest,
  RenameTorrentResult,
  SessionInfo,
  SessionInfoGetRequest,
  SessionInfoSetRequest,
  SessionStats,
  SessionStatsRequest,
  ShutdownRequest,
  TORRENT_INFO_FIELDS,
  TorrentAccessorRequest,
  TorrentAction,
  TorrentActionRequest,
  TorrentInfo,
  TorrentMutatorRequest,
  TorrentSettings,
  TransmissionRequest,
  TransmissionResponse
} from './transmission-api-types';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TransmissionApiService} from './transmission-api.service';
import {ConfigService} from '../app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TransmissionClientService extends TransmissionApiService {

  constructor(private readonly httpClient: HttpClient, private readonly appConfig: ConfigService) {
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

    return this.request<void>(torrentMutatorRequest);
  }

  override getTorrents<T extends keyof TorrentInfo>(...fields: T[]): Observable<Pick<TorrentInfo, T>[]> {
    const torrentAccessorRequest: TorrentAccessorRequest = {
      method: 'torrent-get',
      arguments: {
        fields: fields,
        format: 'objects'
      }
    };

    return this.request<{ torrents: TorrentInfo[] }>(torrentAccessorRequest)
      .pipe(map(result => result.torrents));
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

    return this.request<{ torrents: TorrentInfo[] }>(torrentAccessorRequest)
      .pipe(map(result => result.torrents[0]));
  }

  override addTorrent(torrentCreationOptions: FileTorrentCreationOptions | MetainfoTorrentCreationOptions): Observable<TorrentInfo> {
    const addTorrentRequest: AddTorrentRequest = {
      method: 'torrent-add',
      arguments: torrentCreationOptions
    };

    return this.request<AddedTorrent | DuplicateTorrent>(addTorrentRequest)
      .pipe(
        map(result => {
          if ('torrent-added' in result) {
            return result['torrent-added'];
          } else if ('torrent-duplicate' in result) {
            return result['torrent-duplicate'];
          } else {
            throw Error('Invalid response while adding new torrent: ' + JSON.stringify(result));
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

    return this.request<void>(removeTorrentRequest);
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

    return this.request<void>(moveTorrentRequest);
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

    return this.request<RenameTorrentResult>(renameTorrentRequest);
  }

  override modifySessionInfo(sessionInfo: Partial<SessionInfo>): Observable<void> {
    const sessionInfoSetRequest: SessionInfoSetRequest = {
      method: 'session-set',
      arguments: sessionInfo
    };

    return this.request<void>(sessionInfoSetRequest);
  }

  override getSessionInfo(): Observable<SessionInfo> {
    const sessionInfoGetRequest: SessionInfoGetRequest = {
      method: 'session-get',
      arguments: {}
    };

    return this.request<SessionInfo>(sessionInfoGetRequest);
  }

  override getSessionStats(): Observable<SessionStats> {
    const sessionStatsRequest: SessionStatsRequest = {
      method: 'session-stats',
      arguments: undefined
    };

    return this.request<SessionStats>(sessionStatsRequest);
  }

  override updateBlocklist(): Observable<BlocklistUpdateResult> {
    const blocklistUpdateRequest: BlocklistUpdateRequest = {
      method: 'blocklist-update',
      arguments: undefined
    };

    return this.request<BlocklistUpdateResult>(blocklistUpdateRequest);
  }

  override checkPeerPort(): Observable<PortCheckingResult> {
    const portCheckingRequest: PortCheckingRequest = {
      method: 'port-test',
      arguments: undefined
    };

    return this.request<PortCheckingResult>(portCheckingRequest);
  }

  override shutdown(): Observable<void> {
    const shutdownRequest: ShutdownRequest = {
      method: 'session-close',
      arguments: undefined
    };

    return this.request<void>(shutdownRequest);
  }

  override changeTorrentQueuePosition(torrentInfo: TorrentInfo, queueMovement: QueueMovementAction): Observable<void> {
    const queueMovementRequest: QueueMovementRequest = {
      method: queueMovement,
      arguments: {
        ids: [torrentInfo.id]
      }
    };

    return this.request<void>(queueMovementRequest);
  }

  override getFreeSpace(path: string): Observable<FreeSpaceResult> {
    const freeSpaceRequest: FreeSpaceRequest = {
      method: 'free-space',
      arguments: {
        path: path
      }
    };

    return this.request<FreeSpaceResult>(freeSpaceRequest);
  }

  private requestTorrentAction(torrentAction: TorrentAction, torrentInfos: TorrentInfo[]): Observable<void> {
    const torrentActionRequest: TorrentActionRequest = {
      method: torrentAction,
      arguments: {ids: torrentInfos.map(value => value.id)}
    };

    return this.request<void>(torrentActionRequest);
  }

  private request<ARGS_TYPE>(request: TransmissionRequest<string, unknown>): Observable<ARGS_TYPE> {
    return this.httpClient
      .post<TransmissionResponse<ARGS_TYPE>>(this.appConfig.get('apiUrl').toString(), request)
      .pipe(
        map(response => {
          if (response.result !== 'success') {
            throw Error(response.result);
          }

          return response.arguments;
        })
      );
  }

}
