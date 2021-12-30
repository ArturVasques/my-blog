import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(d: string | undefined): unknown {
    if(!d) {
      return 'Date not available'
    }
    const date = new Date(d);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Out", "Nov", "Dec"]

    let day = '';
    if (date.getDate() === 1) {
      day = `${date.getDate()}st`
    } else if (date.getDate() === 2) {
      day = `${date.getDate()}nd`;
    } else {
      day = `${date.getDate()}th`
    }

    return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${day} ${date.getFullYear()}`;
  }

}
