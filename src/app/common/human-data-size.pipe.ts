import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'humanDataSize'
})
export class HumanDataSizePipe implements PipeTransform {

  transform(bytes: number): string {
    if (bytes > 1_000_000_000) {
      return (bytes / 1_000_000_000).toFixed(2) + ' GB';
    } else if (bytes > 1_000_000) {
      return (bytes / 1_000_000).toFixed(2) + ' MB';
    } else if (bytes > 1_000) {
      return (bytes / 1_000).toFixed(2) + ' KB';
    } else {
      return bytes.toFixed() + ' B';
    }
  }

}
