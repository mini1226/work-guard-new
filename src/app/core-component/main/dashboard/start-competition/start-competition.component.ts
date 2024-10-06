import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
      gender: "Male",
      weight: 75,
      height: 180,
      action: "Edit"
    },
    {
      id: 2,
      name: "Yasara Gynathilaka",
      email: "yasara.gun@example.com",
      device: "D002",
      gender: "Female",
      weight: 65,
      height: 165,
      action: "Edit"
    },
    {
      id: 3,
      name: "Budvin Perera",
      email: "budvin.perera@example.com",
      device: "D003",
      gender: "Male",
      weight: 82,
      height: 175,
      action: "Edit"
    },
    {
      id: 4,
      name: "Anuki Senevirathne",
      email: "anuki.sene@example.com",
      device: "D004",
      gender: "Female",
      weight: 58,
      height: 160,
      action: "Edit"
    },
    {
      id: 5,
      name: "Darshana Peiris",
      email: "darshana.peiris@example.com",
      device: "D005",
      gender: "Male",
      weight: 90,
      height: 185,
      action: "Edit"
    }
  ];


  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

  }


  onBackClick() {
    window.history.back();
  }

  reset(){
  }


  onSubmit(): void {
  }

  liveHr() {
    this.router.navigate([routes.liveHeartRate]);
  }
}
