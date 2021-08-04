export interface TransmissionRequest<METHOD extends string, ARGS_TYPE> {
  method: METHOD;
  arguments: ARGS_TYPE;
  tag?: number;
}

export interface TransmissionResponse<ARGS_TYPE> {
  result: 'success' | string;
  arguments: ARGS_TYPE;
  tag?: number;
}

export type TorrentId = number | string | 'recently-active';

export type TorrentAction = 'torrent-start' | 'torrent-start-now' | 'torrent-stop' | 'torrent-verify' | 'torrent-reannounce';

export type TorrentActionRequest = TransmissionRequest<TorrentAction, { ids?: TorrentId[] }>;

export type TorrentMutatorRequest = TransmissionRequest<'torrent-set', Partial<TorrentSettings>>;

export interface TorrentSettings {
  bandwidthPriority: number;
  downloadLimit: number;
  downloadLimited: boolean;
  'files-wanted': string[];
  'files-unwanted': string[];
  honorsSessionLimits: boolean;
  ids: TorrentId[];
  labels: string[];
  location: string;
  'peer-limit': number;
  'priority-high': string[];
  'priority-low': string[];
  'priority-normal': string[];
  queuePosition: number;
  seedIdleLimit: number;
  seedIdleMode: SeedMode;
  seedRatioLimit: SeedMode;
  seedRatioMode: number;
  trackerAdd: string[];
  trackerRemove: string[];
  trackerReplace: string[];
  uploadLimit: number;
  uploadLimited: boolean;
}

export type TorrentAccessorRequest = TransmissionRequest<'torrent-get', { ids?: TorrentId[]; fields: (keyof TorrentInfo)[]; format?: 'objects' | 'table' }>;

export type TorrentAccessorResponse = TransmissionResponse<{ torrents: TorrentInfo[] }>;

export interface TorrentInfo {
  activityDate: number;
  addedDate: number;
  bandwidthPriority: number;
  comment: string;
  corruptEver: number;
  creator: string;
  dateCreated: number;
  desiredAvailable: number;
  doneDate: number;
  downloadDir: string;
  downloadedEver: number;
  downloadLimit: number;
  downloadLimited: boolean;
  editDate: number;
  error: TorrentState;
  errorString: string;
  eta: number | EtaStatus;
  etaIdle: number;
  'file-count': number;
  files: TorrentFile[];
  fileStats: TorrentFileStats[];
  hashString: string;
  haveUnchecked: number;
  haveValid: number;
  honorsSessionLimits: boolean;
  id: number;
  isFinished: boolean;
  isPrivate: boolean;
  isStalled: boolean;
  labels: string[];
  leftUntilDone: number;
  magnetLink: string;
  manualAnnounceTime: number;
  maxConnectedPeers: number;
  metadataPercentComplete: number;
  name: string;
  'peer-limit': number;
  peers: Peer[];
  peersConnected: number;
  peersFrom: PeerOrigins;
  peersGettingFromUs: number;
  peersSendingToUs: number;
  percentDone: number;
  pieces: string;
  pieceCount: number;
  pieceSize: number;
  priorities: number[];
  'primary-mime-type': string | 0;
  queuePosition: number;
  rateDownload: number;
  rateUpload: number;
  recheckProgress: number;
  secondsDownloading: number;
  secondsSeeding: number;
  seedIdleLimit: number;
  seedIdleMode: SeedMode;
  seedRatioLimit: number;
  seedRatioMode: SeedMode;
  sizeWhenDone: number;
  startDate: number;
  status: TorrentStatus;
  trackers: Tracker[];
  trackerStats: TrackerStats[];
  totalSize: number;
  torrentFile: string;
  uploadedEver: number;
  uploadLimit: number;
  uploadLimited: boolean;
  uploadRatio: number | SeedStatus;
  wanted: Array<0 | 1>;
  webseeds: string[];
  webseedsSendingToUs: number;
}

export enum TorrentState {
  Ok = 0,
  TrackerWarning = 1, // when we anounced to the tracker, we got a warning in the response
  TrackerError = 2, // when we anounced to the tracker, we got an error in the response
  LocalError = 3 // local trouble, such as disk full or permissions error
}

export const TORRENT_INFO_FIELDS: (keyof TorrentInfo)[] = [
  'activityDate', 'addedDate', 'bandwidthPriority', 'comment', 'corruptEver', 'creator', 'dateCreated','desiredAvailable', 'doneDate', 'downloadDir',
  'downloadedEver', 'downloadLimit', 'downloadLimited', 'editDate', 'error', 'errorString', 'eta', 'etaIdle', 'file-count', 'files', 'fileStats',
  'hashString', 'haveUnchecked', 'haveValid', 'honorsSessionLimits', 'id', 'isFinished', 'isPrivate', 'isStalled', 'labels', 'leftUntilDone',
  'magnetLink', 'manualAnnounceTime', 'maxConnectedPeers', 'metadataPercentComplete', 'name', 'peer-limit', 'peers', 'peersConnected', 'peersFrom',
  'peersGettingFromUs', 'peersSendingToUs', 'percentDone', 'pieces', 'pieceCount', 'pieceSize', 'priorities', 'primary-mime-type', 'queuePosition',
  'rateDownload', 'rateUpload', 'recheckProgress', 'secondsDownloading', 'secondsSeeding', 'seedIdleLimit', 'seedIdleMode', 'seedRatioLimit',
  'seedRatioMode', 'sizeWhenDone', 'startDate', 'status', 'trackers', 'trackerStats', 'totalSize', 'torrentFile', 'uploadedEver', 'uploadLimit',
  'uploadLimited', 'uploadRatio', 'wanted', 'webseeds', 'webseedsSendingToUs'
];

export enum SeedMode {
  Inherit = 0,
  IdleTime = 1,
  Unlimited = 2
}

export enum TorrentStatus {
  Stopped = 0, // Torrent is stopped
  CheckQueued = 1, // Queued to check files
  Checking = 2, // Checking files
  DownloadQueued = 3, // Queued to download
  Downloading = 4, // Downloading
  SeedQueued = 5, // Queued to seed
  Seeding = 6 // Seeding
}

export enum EtaStatus {
  NotAvailable = -1,
  Unknown = -2
}

export enum SeedStatus {
  NotAvailable = -1,
  Infinite = -1
}

export interface TorrentFile {
  bytesCompleted: number;
  length: number;
  name: string;
}

export interface TorrentFileStats {
  bytesCompleted: number;
  wanted: boolean;
  priority: FilePriority;
}

enum FilePriority {
  Low = -1,
  Normal = 0,
  High = 1
}

export interface Peer {
  address: string;
  clientName: string;
  clientIsChoked: boolean;
  clientIsInterested: boolean;
  flagStr: string;
  isDownloadingFrom: boolean;
  isEncrypted: boolean;
  isIncoming: boolean;
  isUploadingTo: boolean;
  isUTP: boolean;
  peerIsChoked: boolean;
  peerIsInterested: boolean;
  port: number;
  progress: number;
  rateToClient: number;
  rateToPeer: number;
}

export interface PeerOrigins {
  fromCache: number;
  fromDht: number;
  fromIncoming: number;
  fromLpd: number;
  fromLtep: number;
  fromPex: number;
  fromTracker: number;
}

export interface Tracker {
  announce: string;
  id: number;
  scrape: string;
  tier: number;
}

export enum TrackerState {
  Inactive = 0,
  Waiting = 1,
  Queued = 2,
  Active = 3
}

export interface TrackerStats {
  announce: string;
  announceState: TrackerState;
  downloadCount: number;
  hasAnnounced: boolean;
  hasScraped: boolean;
  host: string;
  id: number;
  isBackup: boolean;
  lastAnnouncePeerCount: number;
  lastAnnounceResult: string;
  lastAnnounceStartTime: number;
  lastAnnounceSucceeded: boolean;
  lastAnnounceTime: number;
  lastAnnounceTimedOut: boolean;
  lastScrapeResult: string;
  lastScrapeStartTime: number;
  lastScrapeSucceeded: boolean;
  lastScrapeTime: number;
  lastScrapeTimedOut: boolean;
  leecherCount: number;
  nextAnnounceTime: number;
  nextScrapeTime: number;
  scrape: string;
  scrapeState: TrackerState;
  seederCount: number;
  tier: number;
}

export interface TorrentCreationOptions {
  cookies?: string;
  'download-dir'?: string;
  paused?: boolean;
  'peer-limit'?: number;
  bandwidthPriority?: number;
  'files-wanted'?: number[];
  'files-unwanted'?: number[];
  'priority-high'?: number[];
  'priority-low'?: number[];
  'priority-normal'?: number[];
}

export interface FileTorrentCreationOptions extends TorrentCreationOptions {
  filename: string;
}

export interface MetainfoTorrentCreationOptions extends TorrentCreationOptions {
  metainfo: string;
}

export interface AddedTorrent {
  'torrent-added': TorrentInfo;
}

export interface DuplicateTorrent {
  'torrent-duplicate': TorrentInfo;
}

export type AddTorrentRequest = TransmissionRequest<'torrent-add', Partial<TorrentCreationOptions>>;

export type AddTorrentResponse = TransmissionResponse<AddedTorrent | DuplicateTorrent>;

export type RemoveTorrentRequest = TransmissionRequest<'torrent-remove', { ids: TorrentId[]; 'delete-local-data': boolean }>;

export type MoveTorrentRequest = TransmissionRequest<'torrent-set-location', { ids: TorrentId[]; location: string; move?: boolean }>;

export interface RenameTorrentResult {
  id: number;
  path: string;
  name: string;
}

export type RenameTorrentRequest = TransmissionRequest<'torrent-rename-path', { ids: TorrentId[]; path: string; name: string }>;

export type RenameTorrentResponse = TransmissionResponse<RenameTorrentResult>;

export interface SessionInfo {
  'alt-speed-down': number;
  'alt-speed-enabled': boolean;
  'alt-speed-time-begin': number;
  'alt-speed-time-enabled': boolean;
  'alt-speed-time-end': number;
  'alt-speed-time-day': ScheduleDay;
  'alt-speed-up': number;
  'blocklist-url': string;
  'blocklist-enabled': boolean;
  'blocklist-size': number;
  'cache-size-mb': number;
  'config-dir': string;
  'download-dir': string;
  'download-queue-size': number;
  'download-queue-enabled': boolean;
  'dht-enabled': boolean;
  'encryption': 'required' | 'preferred' | 'tolerated';
  'idle-seeding-limit': number;
  'idle-seeding-limit-enabled': boolean;
  'incomplete-dir': string;
  'incomplete-dir-enabled': boolean;
  'lpd-enabled': boolean;
  'peer-limit-global': number;
  'peer-limit-per-torrent': number;
  'pex-enabled': boolean;
  'peer-port': number;
  'peer-port-random-on-start': boolean;
  'port-forwarding-enabled': boolean;
  'queue-stalled-enabled': boolean;
  'queue-stalled-minutes': number;
  'rename-partial-files': boolean;
  'rpc-version': number;
  'rpc-version-minimum': number;
  'script-torrent-done-filename': string;
  'script-torrent-done-enabled': boolean;
  'seedRatioLimit': number;
  'seedRatioLimited': boolean;
  'seed-queue-size': number;
  'seed-queue-enabled': boolean;
  'speed-limit-down': number;
  'speed-limit-down-enabled': boolean;
  'speed-limit-up': number;
  'speed-limit-up-enabled': boolean;
  'start-added-torrents': boolean;
  'trash-original-torrent-files': boolean;
  'units': UnitInfo;
  'utp-enabled': boolean;
  'version': string;
}

export enum ScheduleDay {
  Sunday = (1 << 0),
  Monday = (1 << 1),
  Tuesday = (1 << 2),
  Wednesday = (1 << 3),
  Thursday = (1 << 4),
  Friday = (1 << 5),
  Saturday = (1 << 6)
}

export interface UnitInfo {
  'speed-units': string[];
  'speed-bytes': number;
  'size-units': string[];
  'size-bytes': number;
  'memory-units': string[];
  'memory-bytes': number;
}

export type SessionInfoSetRequest = TransmissionRequest<'session-set', Partial<SessionInfo>>;

export type SessionInfoGetRequest = TransmissionRequest<'session-get', { fields?: (keyof SessionInfo)[] }>;

export type SessionInfoGetResponse = TransmissionResponse<Partial<SessionInfo>>;

export type SessionStatsRequest = TransmissionRequest<'session-stats', undefined>;

export type SessionStatsResponse = TransmissionResponse<SessionStats>;

export interface SessionStats {
  activeTorrentCount: number;
  downloadSpeed: number;
  pausedTorrentCount: number;
  torrentCount: number;
  uploadSpeed: number;
  'cumulative-stats': SessionStatsEntry;
  'current-stats': SessionStatsEntry;
}

export interface SessionStatsEntry {
  uploadedBytes: number;
  downloadedBytes: number;
  filesAdded: number;
  sessionCount: number;
  secondsActive: number;
}

export type BlocklistUpdateRequest = TransmissionRequest<'blocklist-update', undefined>;

export type BlocklistUpdateResponse = TransmissionResponse<{ 'blocklist-size': number }>;

export interface PortCheckingResult {
  'port-is-open': boolean;
}

export type PortCheckingRequest = TransmissionRequest<'port-test', undefined>;

export type PortCheckingResponse = TransmissionResponse<PortCheckingResult>;

export type ShutdownRequest = TransmissionRequest<'session-close', undefined>;

export type QueueMovement = 'queue-move-top' | 'queue-move-up' | 'queue-move-down' | 'queue-move-bottom';

export type QueueMovementRequest = TransmissionRequest<QueueMovement, { ids: TorrentId[] }>;

export interface FreeSpaceResult {
  path: string;
  'size-bytes': number;
}

export type FreeSpaceRequest = TransmissionRequest<'free-space', { path: string }>;

export type FreeSpaceResponse = TransmissionResponse<FreeSpaceResult>;
