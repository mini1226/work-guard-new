import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  countdownExpired: boolean = false;
  email: string = ''; // Add this line to declare the 'email' property

  private countdownInterval: any;

  ngOnInit() {
    this.setCountdown();
  }

  ngOnDestroy() {
    clearInterval(this.countdownInterval);
  }

  setCountdown() {
    const countdownDate = new Date('Mar 27, 2024 16:00:00').getTime();

    this.countdownInterval = setInterval(() => {
      const todayDate = new Date().getTime();
      const distance = countdownDate - todayDate;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.countdownExpired = true;
      }
    }, 1000);
  }

 
}
