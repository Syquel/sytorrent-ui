import type {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';

@Pipe({
  name: 'humanTime'
})
export class HumanTimePipe implements PipeTransform {

  transform(seconds: number): string {
    let remainingSeconds: number = seconds;

    const days: number = Math.floor(remainingSeconds / (60*60*24));
    remainingSeconds -= days * (60*60*24);

    const hours: number = Math.floor(remainingSeconds / (60*60));
    remainingSeconds -= hours * (60*60);

    const minutes: number = Math.floor(remainingSeconds / 60);
    remainingSeconds -= minutes * 60;

    let time = '';
    if (days > 0) {
      time += days.toFixed() + 'd ';
    }
    if (hours > 0) {
      time += hours.toFixed() + 'h ';
    }
    if (minutes > 0) {
      time += minutes.toFixed() + 'min ';
    }

    time += remainingSeconds.toFixed() + 'sec';

    return time;
  }

}
