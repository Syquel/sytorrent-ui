import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TorrentOverviewComponent} from './torrent-overview/torrent-overview.component';
import {TorrentSettingsComponent} from './torrent-settings/torrent-settings.component';
import {TorrentAddComponent} from './torrent-add/torrent-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: TorrentOverviewComponent },
  { path: 'settings', component: TorrentSettingsComponent },
  { path: 'add', component: TorrentAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
