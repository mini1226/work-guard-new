import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {Database, endAt, onValue, orderByChild, query, ref, startAt} from "@angular/fire/database";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SessionService} from "../../../../core/service/sessions/session.service";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {SweetalertService} from "../../../../shared/sweetalert/sweetalert.service";
import {DatePipe} from "@angular/common";
import {CommonService} from "../../../../core/service/common/common.service";

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
  raceStartTime: any = '20:01:15:418';

  sessionForm: FormGroup = new FormGroup({
    sessionId: new FormControl(''),
    sessionStartTime: new FormControl(''),
    sessionEndTime: new FormControl(''),
    athletes: new FormArray([]),
  });

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe,
              private alertservice: SweetalertService, private athleteService: AthleteService,
              private sessionService: SessionService, private af: Database,
              private commonService: CommonService) {

  }

  get athletes(): FormArray {
    return this.sessionForm.get('athletes') as FormArray;
  }

  calculateParams(device: string, startTime: string, endTime: string, index: number) {
    let databaseReference = ref(this.af, device + '/GPS');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    let distanceRun = 0;
    onValue(res, snapshot => {
      if (snapshot.val() != null) {
        let values: any[] = Object.values(snapshot.val());
        this.commonService.calculateDistance(values[0].Latitude, values[0].Longitude, values[values.length - 1].Latitude, values[values.length - 1].Longitude).then(value => {
          distanceRun = value;
        });
      }
    })

    let reference = ref(this.af, device + '/BPM');
    let resBPM = query(reference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(resBPM, snapshot => {
      if (snapshot.val() != null) {
        let timeTakenInMinutes;
        this.commonService.convertToMinutes(this.stopWatch).then(value => {
          timeTakenInMinutes = value;
        })
        if (timeTakenInMinutes) {
          let values: any[] = Object.values(snapshot.val());
          let cardiovascularDrift = (values[values.length - 1].BPM_VALUE - values[0].BPM_VALUE) / timeTakenInMinutes;
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
        }
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

  stopTimer(device: string, i: number): void {
    if (this.interval !== null) {
      this.athletes.controls[i].patchValue({
        duration: this.stopWatch,
        isStop: true
      })
      this.commonService.individualRaceEndTime(this.raceStartTime, this.stopWatch).then((endTime: string) => {
        this.calculateParams(device, this.raceStartTime, endTime, i)
      });
    }
  }

  updateDisplay(): void {
    this.stopWatch = this.formatTime(this.seconds);
  }

  onSave(): void {
    this.calculateParams('D001',this.raceStartTime,this.stopWatch,1);
    this.sessionForm.patchValue({
      'sessionStartTime': this.raceStartTime,
      'sessionEndTime': this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss:SSS'),
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
    });


    const sessionId = {
      'id': this.isEditId
    };
    this.sessionService.startSession(sessionId, this.isEditId).subscribe(value => {
      this.alertservice.saveBtn();
    }, error => {
    });

  }

  reset() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onSubmit(): void {
    this.raceStartTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss:SSS');
    this.startTimer();
  }

  liveHr(device: string, duration: any) {
    console.log(duration);
    this.commonService.individualRaceEndTime(this.raceStartTime, duration).then((endTime: string) => {
      console.log(endTime);
      const x = {
        device: device,
        startTime: this.raceStartTime,
        endTime: endTime
      }
      console.log(x);
      this.router.navigate([routes.liveHeartRate], {queryParams: x});
    })
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
              deviceId: new FormControl(item.device_id),
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
