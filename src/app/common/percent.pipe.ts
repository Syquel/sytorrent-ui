import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value * 100);
  }

}
