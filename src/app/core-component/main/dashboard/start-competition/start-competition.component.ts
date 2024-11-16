import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {Database, endAt, onValue, orderByChild, query, ref, startAt} from "@angular/fire/database";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SessionService} from "../../../../core/service/sessions/session.service";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";

@Component({
  selector: 'app-start-competition',
  templateUrl: './start-competition.component.html',
  styleUrl: './start-competition.component.scss'
})
export class StartCompetitionComponent implements OnInit {
  public routes = routes;
  isEditId: any;
  sampleData = [
    {
      id: 1,
      name: "Sadun Fernando",
      email: "sadun.fer@example.com",
      device: "D001",
      timer: '0',
      gender: "Male",
      weight: 75,
      height: 180,
      action: "Edit",
      isStop: false
    },
    {
      id: 2,
      name: "Yasara Gynathilaka",
      email: "yasara.gun@example.com",
      device: "D002",
      timer: '0',
      gender: "Female",
      weight: 65,
      height: 165,
      action: "Edit",
      isStop: false
    },
    {
      id: 3,
      name: "Budvin Perera",
      email: "budvin.perera@example.com",
      device: "D003",
      timer: '0',
      gender: "Male",
      weight: 82,
      height: 175,
      action: "Edit",
      isStop: false
    },
    {
      id: 4,
      name: "Anuki Senevirathne",
      email: "anuki.sene@example.com",
      device: "D004",
      timer: '0',
      gender: "Female",
      weight: 58,
      height: 160,
      action: "Edit",
      isStop: false
    },
    {
      id: 5,
      name: "Darshana Peiris",
      email: "darshana.peiris@example.com",
      device: "D005",
      timer: '0',
      gender: "Male",
      weight: 90,
      height: 185,
      action: "Edit",
      isStop: false
    }
  ];
  seconds: number = 0;
  interval: number | null = null;
  stopWatch = '00:00:00';
  athletesAll: Array<any> = [];
  startTime = '00:00:00';
  sessionForm: FormGroup = new FormGroup({
    sessionId: new FormControl(''),
    sessionStartTime: new FormControl(''),
    sessionEndTime: new FormControl(''),
    athleteSessionTimes: new FormArray([]),
  });
  distance: number = 0;
  private readonly EARTH_RADIUS = 6371e3;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private athleteService: AthleteService,
              private sessionService: SessionService, private af: Database) {
  }

  get athleteSessionTimes(): FormArray {
    return this.sessionForm.get('athleteSessionTimes') as FormArray;
  }

  getData(device: string, startTime: string, endTime: string,index:number) {
    let databaseReference = ref(this.af, device + '/GPS');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(res, snapshot => {
      if (snapshot.val() != null) {
        let values: any[] = Object.values(snapshot.val());
        console.log(values);
       let number = this.calculateDistance(values[0].Latitude, values[0].Longitude, values[values.length - 1].Latitude, values[values.length - 1].Longitude);
       this.athleteSessionTimes.controls[index].patchValue({
         distance:number,
       })
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

  onBackClick() {
    window.history.back();
  }

  reset() {
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
      this.athleteSessionTimes.controls[i].patchValue({
        duration: this.stopWatch,
        isStop: true
      })
      this.getData('D001', '08:03:24', '08:03:28',i)
    }
  }

  updateDisplay(): void {
    this.stopWatch = this.formatTime(this.seconds);
  }

  onSave(): void {
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
    this.startTime = '00:00:00'
    this.startTimer()
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
              distance: new FormControl('0'),
              isStop: new FormControl(false),
            });
            this.athleteSessionTimes.push(formGroup);
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
      // this.sampleData
    })
  }
}
