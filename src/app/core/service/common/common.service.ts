import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public base: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public page: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public last: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _currency = new BehaviorSubject<string>('USD');
  public readonly currency$ = this._currency.asObservable();
  private readonly EARTH_RADIUS = 6371e3;

  individualRaceEndTime(baseTime: string, duration: string): Promise<string> {
    console.log(baseTime);
    return new Promise<string>(resolve => {
      let year = baseTime.split(' ')[0];
      baseTime = baseTime.split(' ')[1];
      const [baseHours, baseMinutes, baseSeconds] = baseTime.split(':').map(Number);
      const [durationHours, durationMinutes, durationSeconds] = duration.split(':').map(Number);

      const baseTimeInMilliseconds =
        (baseHours * 3600 + baseMinutes * 60 + baseSeconds) * 1000;
      const durationInMilliseconds =
        (durationHours * 3600 + durationMinutes * 60 + durationSeconds) * 1000 ;
      const totalMilliseconds = baseTimeInMilliseconds + durationInMilliseconds;
      const resultHours = Math.floor(totalMilliseconds / (3600 * 1000)) % 24; // Handle overflow of 24 hours
      const resultMinutes = Math.floor((totalMilliseconds % (3600 * 1000)) / (60 * 1000));
      const resultSeconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
      const resultMilliseconds = totalMilliseconds % 1000;
      let s = [
        resultHours.toString().padStart(2, '0'),
        resultMinutes.toString().padStart(2, '0'),
        resultSeconds.toString().padStart(2, '0'),
        // resultMilliseconds.toString().padStart(3, '0'),
      ].join(':');
      resolve(year + ' ' + s);
    })
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> {
    console.log(lat1);
    console.log(lat2);
    console.log(lon1);
    console.log(lon2);
    return new Promise(resolve => {
      const toRadians = (degrees: number) => degrees * (Math.PI / 180);
      const q1 = toRadians(lat1);
      const q2 = toRadians(lat2);
      const diff = q2 - q1;
      const pl = toRadians(lon2 - lon1);
      const a = Math.sin(diff / 2) ** 2 +
        Math.cos(q1) * Math.cos(q2) *
        Math.sin(pl / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      console.log(c);
      resolve(this.EARTH_RADIUS * c);
    })
  }

  convertToMinutes(timeString: string, fps: number = 30): Promise<number> {
    return new Promise<number>(resolve => {
      if (!timeString) {
        throw new Error('Invalid time string');
      }
      console.log(timeString);
      const parts = timeString.split(':');
      console.log(parts);
      if (parts.length !== 4) {
        throw new Error('Time string must be in the format HH:MM:SS:FF');
      }

      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      const frames = parseInt(parts[3], 10);
      const secondsFromFrames = frames / fps;
      console.log('Hours : ', hours, ' Minutes : ', minutes, ' Seconds : ', seconds, ' MilliSeconds : ', frames, ' Seconds for frames : ', secondsFromFrames);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds + secondsFromFrames;
      console.log('Total Seconds : ', totalSeconds);
      resolve(totalSeconds / 60);
    })
  }
}
