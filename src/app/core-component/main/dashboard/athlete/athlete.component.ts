import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.scss'
})
export class AthleteComponent {

  sampleData = [
    {
      id: 1,
      name: "Sadun Fernando",
      email: "sadun.fer@example.com",
      device: "D001",
      gender: "Male",
      age: "24",
      level: "General Preparation",
      hrRange: '120-150',
      weight: 75,
      height: 180,
      action: "Edit",
      events: "1000m,3000m"
    },
    {
      id: 2,
      name: "Yasara Gunathilaka",
      email: "yasara.gun@example.com",
      device: "D002",
      gender: "Female",
      age: "28",
      level: "Special Preparation",
      hrRange: '150-165',
      weight: 65,
      height: 165,
      action: "Edit",
      events: "10000m,Marathon"
    },
    {
      id: 3,
      name: "Budvin Perera",
      email: "budvin.perera@example.com",
      device: "D003",
      gender: "Male",
      age: "20",
      level: "Pre Competition",
      hrRange: '165-175',
      weight: 82,
      height: 175,
      action: "Edit",
      events: "5000m,1000m,500m"
    },
    {
      id: 4,
      name: "Anuki Senevirathne",
      email: "anuki.sene@example.com",
      device: "D004",
      gender: "Female",
      age: "18",
      level: "Competition",
      hrRange: '175-185',
      weight: 58,
      height: 160,
      action: "Edit",
      events: "4000m,800m,1000m"
    },
    {
      id: 5,
      name: "Darshana Peiris",
      email: "darhsana.peiris@example.com",
      device: "D005",
      gender: "Male",
      age: "17",
      level: "General Preparation",
      hrRange: '185-200',
      weight: 90,
      height: 185,
      action: "Edit",
      events: "1000m,800m,4000m"
    },
    {
      id: 6,
      name: "Sandali Senaratne",
      email: "sandali.sene@example.com",
      device: "D006",
      gender: "Female",
      age: "19",
      level: "Special Preparation",
      hrRange: ' 120-150',
      weight: 70,
      height: 170,
      action: "Edit",
      events: "1000m,2000m"
    },
    {
      id: 7,
      name: "Kavindu Fonseka",
      email: "kavindu.fon@example.com",
      device: "D007",
      gender: "Male",
      age: "24",
      level: "Pre Competition",
      hrRange: '150-165',
      weight: 68,
      height: 172,
      action: "Edit",
      events: "4000m,8000m,2000m"
    },
    {
      id: 8,
      name: "Binuli Athauda",
      email: "binuli.athauda@example.com",
      device: "D008",
      gender: "Female",
      age: "20",
      level: "Competition",
      hrRange: '165-175',
      weight: 60,
      height: 162,
      action: "Edit",
      events: "1000m,2000m"
    },
    {
      id: 9,
      name: "Prasad Gamage",
      email: "prasad.gamage@example.com",
      device: "D009",
      gender: "Male",
      age: "21",
      level: "General Preparation",
      hrRange: '175-185',
      weight: 85,
      height: 178,
      action: "Edit",
      events: "800m,2000m,1000m"
    },
    {
      id: 10,
      name: "Manoja Subasinghe",
      email: "manoja.subasinghe@example.com",
      device: "D010",
      gender: "Female",
      age: "21",
      level: "Special Preparation",
      hrRange: '185-200',
      weight: 55,
      height: 158,
      action: "Edit",
      events: "2000m,800m"
    }
  ];

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
      console.log(value);
      // this.sampleData
    })
  }
}
