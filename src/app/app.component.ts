import {ChangeDetectionStrategy, Component} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'sytorrent-ui';

  torrentAddIcon = faPlus;
}
