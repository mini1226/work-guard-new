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
export class StartCompetitionComponent implements OnInit,OnDestroy{
  public routes = routes;
  isEditId: any;

  seconds: number = 0;
  interval: number | null = null;
  stopWatch = '00:00:00';
  athletesAll: Array<any> = [];

  startTime = '00:00:00';
  raceStartTime: any;
  raceEndTime: any;

  sessionForm: FormGroup = new FormGroup({
    sessionId: new FormControl(''),
    sessionStartTime: new FormControl(''),
    sessionEndTime: new FormControl(''),
    athletes: new FormArray([]),
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private alertservice: SweetalertService,
              private athleteService: AthleteService,
              private sessionService: SessionService, private af: Database) {}

  getData() {
    let databaseReference = ref(this.af, 'D001/GPS');
    let query1 = query(databaseReference, orderByChild('Time'), startAt("08:03:24"), endAt("08:03:28"));
    onValue(query1, snapshot => {
      if (snapshot.val() != null) {
        console.log(snapshot.val());
        let strings: string[] = Object.keys(snapshot.val());
        let values: number[] = Object.values(snapshot.val());
      }
    })

  }

  formatTime(time: number): string {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const format = (num: number) => (num < 10 ? '0' + num : num);
    return `${format(minutes)}:${format(seconds)}:${milliseconds.toString().padStart(2, '0')}`;
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

  get athletes(): FormArray {
    return this.sessionForm.get('athletes') as FormArray;
    this.getData();
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
      this.athletes.controls[i].patchValue({
        duration: this.stopWatch,
        isStop: true
      })
      // this.sampleData[i].timer = this.stopWatch;
      // this.sampleData[i].isStop = true;
    }
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

    const formValue = { ...this.sessionForm.value };

    // Remove `isStop` from `athletes`
    formValue.athletes = formValue.athletes.map((item: any) => {
      const { isStop, ...rest } = item; // Use `any` for destructuring
      return rest;
    });

    // Log the updated form value
    console.log('Updated Form Value:', formValue);

    this.sessionService.saveSessionAll(formValue).subscribe(value => {
      this.alertservice.saveBtn();
    }, error => {
    })

  }


  reset(){
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
    this.startTime ='00:00:00'
    this.startTimer();
    this.raceStartTime = now.toISOString(); // Set the current datetime in ISO format for raceStartTime
  }


  liveHr() {
    this.router.navigate([routes.liveHeartRate]);
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
      this.athletesAll=value;
      // this.sampleData
    })
  }

  ngOnDestroy(): void {
    this.reset();
  }
}
