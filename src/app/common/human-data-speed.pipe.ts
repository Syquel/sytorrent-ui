import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'humanDataSpeed'
})
export class HumanDataSpeedPipe implements PipeTransform {

  transform(bytesPerSecond: number): string {
    if (bytesPerSecond > 1_000_000) {
      return (bytesPerSecond / 1_000_000).toFixed(1) + ' MB/s';
    } else if (bytesPerSecond > 1_000) {
      return (bytesPerSecond / 1_000).toFixed(1) + ' KB/s';
    } else {
      return bytesPerSecond.toFixed() + ' B/s';
    }
  }

}
