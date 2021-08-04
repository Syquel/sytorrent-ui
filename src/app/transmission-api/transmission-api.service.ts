import {
  FileTorrentCreationOptions,
  FreeSpaceResult,
  MetainfoTorrentCreationOptions,
  PortCheckingResult,
  QueueMovement,
  RenameTorrentResult,
  SessionInfo,
  SessionStats,
  TorrentInfo,
  TorrentSettings
} from './transmission-api-types';
import {Observable} from 'rxjs';

type TorrentIdentity = Pick<TorrentInfo, 'id'>;

export abstract class TransmissionApiService {

  abstract startTorrents(torrentInfos: TorrentIdentity[]): Observable<void>;

  abstract startTorrent(torrentInfo: TorrentIdentity): Observable<void>;

  abstract startTorrentsNow(torrentInfos: TorrentIdentity[]): Observable<void>;

  abstract startTorrentNow(torrentInfo: TorrentIdentity): Observable<void>;

  abstract stopTorrents(torrentInfos: TorrentIdentity[]): Observable<void>;

  abstract stopTorrent(torrentInfo: TorrentIdentity): Observable<void>;

  abstract verifyTorrents(torrentInfos: TorrentIdentity[]): Observable<void>;

  abstract verifyTorrent(torrentInfo: TorrentIdentity): Observable<void>;

  abstract reannounceTorrents(torrentInfos: TorrentIdentity[]): Observable<void>;

  abstract reannounceTorrent(torrentInfo: TorrentIdentity): Observable<void>;

  abstract modifyTorrent(torrentInfo: TorrentIdentity, torrentSettings: Partial<TorrentSettings>): Observable<void>;

  abstract getTorrents<T extends keyof TorrentInfo>(...fields: T[]): Observable<Pick<TorrentInfo, T>[]>;

  abstract getTorrent(torrentInfo: TorrentIdentity): Observable<TorrentInfo>;

  abstract addTorrent(torrentCreationOptions: FileTorrentCreationOptions | MetainfoTorrentCreationOptions): Observable<TorrentInfo>;

  abstract removeTorrents(torrentInfos: TorrentIdentity[], deleteLocalData: boolean): Observable<void>;

  abstract removeTorrent(torrentInfo: TorrentIdentity, deleteLocalData: boolean): Observable<void>;

  abstract moveTorrents(torrentInfos: TorrentIdentity[], newLocation: string, move: boolean): Observable<void>;

  abstract moveTorrent(torrentInfo: TorrentIdentity, newLocation: string, move: boolean): Observable<void>;

  abstract renameTorrent(torrentInfo: TorrentIdentity, path: string, newName: string): Observable<RenameTorrentResult>;

  abstract modifySessionInfo(sessionInfo: Partial<SessionInfo>): Observable<void>;

  abstract getSessionInfo(): Observable<SessionInfo>;

  abstract getSessionStats(): Observable<SessionStats>;

  abstract updateBlocklist(): Observable<void>;

  abstract checkPeerPort(): Observable<PortCheckingResult>;

  abstract changeTorrentQueuePosition(torrentInfo: TorrentInfo, queueMovement: QueueMovement): Observable<void>;

  abstract getFreeSpace(path: string): Observable<FreeSpaceResult>;

}
