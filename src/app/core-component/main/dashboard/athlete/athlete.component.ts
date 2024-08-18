import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.scss'
})
export class AthleteComponent {

  sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      device: "D001",
      gender: "Male",
      level: "Beginner",
      hrRange: '70-80',
      weight: 75,
      height: 180,
      action: "Edit"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      device: "D002",
      gender: "Female",
      level: "Intermediate",
      hrRange: '70-80',
      weight: 65,
      height: 165,
      action: "Edit"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      device: "D003",
      gender: "Male",
      level: "Intermediate",
      hrRange: '80-90',
      weight: 82,
      height: 175,
      action: "Edit"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      device: "D004",
      gender: "Female",
      level: "Expert",
      hrRange: '80-90',
      weight: 58,
      height: 160,
      action: "Edit"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      device: "D005",
      gender: "Male",
      level: "Beginner",
      hrRange: '100-120',
      weight: 90,
      height: 185,
      action: "Edit"
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      device: "D006",
      gender: "Female",
      level: "Expert",
      hrRange:' 70-80',
      weight: 70,
      height: 170,
      action: "Edit"
    },
    {
      id: 7,
      name: "James Lee",
      email: "james.lee@example.com",
      device: "D007",
      gender: "Male",
      level: "Intermediate",
      hrRange: '80-90',
      weight: 68,
      height: 172,
      action: "Edit"
    },
    {
      id: 8,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      device: "D008",
      gender: "Female",
      level: "Expert",
      hrRange: '90-100',
      weight: 60,
      height: 162,
      action: "Edit"
    },
    {
      id: 9,
      name: "Daniel White",
      email: "daniel.white@example.com",
      device: "D009",
      gender: "Male",
      level: "Beginner",
      hrRange: '70-80',
      weight: 85,
      height: 178,
      action: "Edit"
    },
    {
      id: 10,
      name: "Isabella Garcia",
      email: "isabella.garcia@example.com",
      device: "D0010",
      gender: "Female",
      level: "Expert",
      hrRange: '80-90',
      weight: 55,
      height: 158,
      action: "Edit"
    }
  ];

  constructor(private router:Router) {
  }

  addAthletes() {
    this.router.navigate([routes.addAthlete]);
  }
}
