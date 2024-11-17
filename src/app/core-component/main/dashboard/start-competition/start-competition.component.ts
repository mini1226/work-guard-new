import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {Database, endAt, onValue, orderByChild, query, ref, startAt} from "@angular/fire/database";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SessionService} from "../../../../core/service/sessions/session.service";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {SweetalertService} from "../../../../shared/sweetalert/sweetalert.service";

@Component({
  selector: 'app-start-competition',
  templateUrl: './start-competition.component.html',
  styleUrl: './start-competition.component.scss'
})
export class StartCompetitionComponent implements OnInit, OnDestroy {
  public routes = routes;
  isEditId: any;

  seconds: number = 0;
  interval: number | null = null;
  stopWatch = '00:00:00:00';
  athletesAll: Array<any> = [];
  startTime = '00:00:00:00';
  raceStartTime: any;
  raceEndTime: any;

  sessionForm: FormGroup = new FormGroup({
    sessionId: new FormControl(''),
    sessionStartTime: new FormControl(''),
    sessionEndTime: new FormControl(''),
    athletes: new FormArray([]),
  });
  distance: number = 0;
  private readonly EARTH_RADIUS = 6371e3;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private alertservice: SweetalertService,
              private athleteService: AthleteService,
              private sessionService: SessionService, private af: Database) {
  }

  get athletes(): FormArray {
    return this.sessionForm.get('athletes') as FormArray;
  }

  getData(device: string, startTime: string, endTime: string, index: number) {
    let databaseReference = ref(this.af, device + '/GPS');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    let distanceRun = 0;
    onValue(res, snapshot => {
      if (snapshot.val() != null) {
        let values: any[] = Object.values(snapshot.val());
        distanceRun = this.calculateDistance(values[0].Latitude, values[0].Longitude, values[values.length - 1].Latitude, values[values.length - 1].Longitude);
        console.log(distanceRun);
      }
    })

    let reference = ref(this.af, device + '/BPM');
    let resBPM = query(reference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(resBPM, snapshot => {
      if (snapshot.val() != null) {
        let timeTakenInMinutes = this.convertToMinutes(this.stopWatch);
        console.log(snapshot.val());
        let values: any[] = Object.values(snapshot.val());
        console.log(values[values.length - 1].BPM_VALUE);
        console.log(values[0].BPM_VALUE);
        let cardiovascularDrift = (values[values.length - 1].BPM_VALUE - values[0].BPM_VALUE) / timeTakenInMinutes;
        console.log(cardiovascularDrift);

        let totalHeartRate = 0;
        values.forEach(value => {
          totalHeartRate += value.BPM_VALUE;
        })

        let avgHR = (totalHeartRate / values.length);
        let caloriesBurned = ((avgHR * this.athletes.controls[index].value.althlete_weight * timeTakenInMinutes) * 5) / 1000;
        let pace = timeTakenInMinutes / distanceRun;

        this.athletes.controls[index].patchValue({
          distance: distanceRun,
          cardiovascularLift: cardiovascularDrift,
          caloriesBurned: caloriesBurned,
          pace: pace
        })
        console.log(this.athletes.value);
      }
    });
  }

  formatTime(time: number): string {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));
    const format = (num: number) => (num < 10 ? '0' + num : num);
    return `${format(hours)}:${format(minutes)}:${format(seconds)}:${milliseconds.toString().padStart(2, '0')}`;
  }

  convertToMinutes(timeString: string, fps: number = 30): number {
    if (!timeString) {
      throw new Error('Invalid time string');
    }

    const parts = timeString.split(':');
    if (parts.length !== 4) {
      throw new Error('Time string must be in the format HH:MM:SS:FF');
    }

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    const frames = parseInt(parts[3], 10);
    const secondsFromFrames = frames / fps;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds + secondsFromFrames;
    return totalSeconds / 60;
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
    this.loadAllAthletes();

    if (this.isEditId) {
      this.getSessionById()
        .then(() => {
          console.log('Session Form Value:', this.sessionForm.value);
        })
        .catch((error) => {
          console.error('Failed to load session data:', error);
        });
    }
  }

  onBackClick() {
    window.history.back();
  }


  startTimer(): void {
    if (this.interval) return;  // Prevent multiple intervals
    this.interval = window.setInterval(() => {
      this.seconds++;
      this.updateDisplay();
    }, 1);
  }

  stopTimer(i: number): void {
    if (this.interval !== null) {
      // this.athletes.controls[i].patchValue({
      //   duration: this.stopWatch,
      //   isStop: true
      // })
      this.addTime('20:01:15:418', this.stopWatch).then(endTime => {
        console.log(endTime);
        this.getData('D001', '20:01:15:418', endTime, i)
      })
    }
  }

  addTime(baseTime: string, duration: string): Promise<string> {
    return new Promise<string>(resolve => {
      const [baseHours, baseMinutes, baseSeconds, baseMilliseconds] = baseTime.split(':').map(Number);
      const [durationHours, durationMinutes, durationSeconds, durationMilliseconds] = duration.split(':').map(Number);

      const baseTimeInMilliseconds =
        (baseHours * 3600 + baseMinutes * 60 + baseSeconds) * 1000 + baseMilliseconds;
      const durationInMilliseconds =
        (durationHours * 3600 + durationMinutes * 60 + durationSeconds) * 1000 + durationMilliseconds;
      const totalMilliseconds = baseTimeInMilliseconds + durationInMilliseconds;
      const resultHours = Math.floor(totalMilliseconds / (3600 * 1000)) % 24; // Handle overflow of 24 hours
      const resultMinutes = Math.floor((totalMilliseconds % (3600 * 1000)) / (60 * 1000));
      const resultSeconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
      const resultMilliseconds = totalMilliseconds % 1000;
      resolve([
        resultHours.toString().padStart(2, '0'),
        resultMinutes.toString().padStart(2, '0'),
        resultSeconds.toString().padStart(2, '0'),
        resultMilliseconds.toString().padStart(3, '0'),
      ].join(':'));
    })
  }


  updateDisplay(): void {
    this.stopWatch = this.formatTime(this.seconds);
  }

  onSave(): void {
    const now = new Date();
    this.raceEndTime = now.toISOString();

    this.sessionForm.patchValue({
      'sessionStartTime': this.raceStartTime,
      'sessionEndTime': this.raceEndTime,
    });

    const formValue = {...this.sessionForm.value};

    // Remove `isStop` from `athletes`
    formValue.athletes = formValue.athletes.map((item: any) => {
      const {isStop, ...rest} = item; // Use `any` for destructuring
      return rest;
    });

    // Log the updated form value
    console.log('Updated Form Value:', formValue);

    this.sessionService.saveSessionAll(formValue).subscribe(value => {
      this.alertservice.saveBtn();
    }, error => {
    })

  }


  reset() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onSubmit(): void {
    const now = new Date();
    console.log(now);
    console.log(now.toString()); // Full readable date
    console.log(now.toISOString()); // ISO 8601 format
    this.startTime = '00:00:00:00'
    this.startTimer();
    this.raceStartTime = now.toISOString(); // Set the current datetime in ISO format for raceStartTime
  }


  liveHr() {
    this.router.navigate([routes.liveHeartRate]);
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const q1 = toRadians(lat1);
    const q2 = toRadians(lat2);
    const diff = q2 - q1;
    const pl = toRadians(lon2 - lon1);
    const a = Math.sin(diff / 2) ** 2 +
      Math.cos(q1) * Math.cos(q2) *
      Math.sin(pl / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.EARTH_RADIUS * c;
  }

  ngOnDestroy(): void {
    this.reset();
  }

  private getSessionById(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sessionService.getSessionById(this.isEditId).subscribe({
        next: (value) => {
          console.log(value);
          this.sessionForm.patchValue({
            'sessionId': this.isEditId,
          });

          value.session_details.forEach((item: any) => {
            let formGroup = new FormGroup({
              athleteId: new FormControl(item.athlete_id),
              duration: new FormControl('0'),
              isStop: new FormControl(false),
              distance: new FormControl(''),
              caloriesBurned: new FormControl(''),
              cardiovascularLift: new FormControl(''),
              pace: new FormControl(''),
            });
            this.athletes.push(formGroup);
          });

          resolve(); // Resolve the promise once everything is done
        },
        error: (error) => {
          console.error('Error fetching session:', error);
          reject(error); // Reject the promise in case of an error
        },
      });
    });
  }

  private loadAllAthletes() {
    this.athleteService.getAthleteAll(localStorage.getItem('userId')).subscribe(value => {
      this.athletesAll = value;
    })
  }
}
