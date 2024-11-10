import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {Athlete} from "../../../../core/models/models";

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.scss'
})
export class AthleteComponent {

  athletes: Array<any> = [];

  constructor(private router: Router, private athleteService: AthleteService) {
    this.loadAllAthletes();
  }

  addAthletes() {
    this.router.navigate([routes.addAthlete]);
  }

  editAthletes(athleteId: any) {
    this.router.navigate([routes.addAthlete], {
      queryParams: {
        id: athleteId
      }
    });
  }

  private loadAllAthletes() {
    this.athleteService.getAthleteAll(localStorage.getItem('userId')).subscribe(value => {
      this.athletes=value;
      // this.sampleData
    })
  }
}
