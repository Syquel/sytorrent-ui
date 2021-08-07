import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TransmissionSessionInterceptor} from './transmission-api/transmission-session.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TorrentOverviewComponent} from './torrent-overview/torrent-overview.component';
import {TorrentSettingsComponent} from './torrent-settings/torrent-settings.component';
import {TorrentAddComponent} from './torrent-add/torrent-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TransmissionApiService} from './transmission-api/transmission-api.service';
import {HumanDataSpeedPipe} from './common/human-data-speed.pipe';
import {HumanTimePipe} from './common/human-time.pipe';
import {PercentPipe} from './common/percent.pipe';
import {HumanDataSizePipe} from './common/human-data-size.pipe';
import {TransmissionClientService} from './transmission-api/transmission-client.service';
import {AppConfigService, ConfigService} from './app-config/app-config.service';

@NgModule({
  declarations: [
    AppComponent,
    HumanDataSizePipe,
    HumanDataSpeedPipe,
    HumanTimePipe,
    PercentPipe,
    TorrentAddComponent,
    TorrentOverviewComponent,
    TorrentSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ConfigService, useClass: AppConfigService },
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: (appConfigService: AppConfigService) => (): Promise<void> => appConfigService.init(),
      multi: true
    },
    { provide: TransmissionApiService, useClass: TransmissionClientService },
    { provide: HTTP_INTERCEPTORS, useClass: TransmissionSessionInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
