import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";

@Component({
  selector: 'app-start-competition',
  templateUrl: './start-competition.component.html',
  styleUrl: './start-competition.component.scss'
})
export class StartCompetitionComponent {
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

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  formatTime(time: number): string {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const format = (num: number) => (num < 10 ? '0' + num : num);
    return `${format(minutes)}:${format(seconds)}:${milliseconds.toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {

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
      this.sampleData[i].timer = this.stopWatch;
      this.sampleData[i].isStop = true;
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
    this.startTimer()
  }


  liveHr() {
    this.router.navigate([routes.liveHeartRate]);
  }
}
