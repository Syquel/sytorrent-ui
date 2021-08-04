import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TransmissionClientService} from '../transmission-api/transmission-client.service';
import {FileTorrentCreationOptions} from '../transmission-api/transmission-api-types';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup} from 'ngx-typesafe-forms';
import {ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-torrent-add',
  templateUrl: './torrent-add.component.html',
  styleUrls: ['./torrent-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TorrentAddComponent {

  addTorrentForm = new FormGroup<{torrentUrl: string}>({
    torrentUrl: new FormControl<string>('', [Validators.required, TorrentAddComponent.validateUrl])
  });

  constructor(private readonly torrentApi: TransmissionClientService, private readonly router: Router) { }

  addTorrent(): void {
    if (!this.addTorrentForm.valid) {
      console.warn('Form is not valid!', this.addTorrentForm.errors);
      return;
    }

    const torrentFormValue = this.addTorrentForm.value;

    const torrentCreationOptions: FileTorrentCreationOptions = {
      filename: torrentFormValue.torrentUrl
    };

    this.torrentApi
      .addTorrent(torrentCreationOptions)
      .subscribe(
        () => void this.router.navigate(['overview']),
        error => console.log('Failed to add torrent', error)
      );
  }

  cancel(): void {
    void this.router.navigate(['overview']);
  }

  private static validateUrl(control: AbstractControl<string>): ValidationErrors | null {
    let url: URL;
    try {
      url = new URL(control.value);
    } catch (e) {
      return {'invalidUrl': 'URL is invalid'};
    }

    if (!url.protocol || !url.host || !url.pathname) {
      return {'invalidUrl': 'URL is invalid'};
    }

    return null;
  }

}
