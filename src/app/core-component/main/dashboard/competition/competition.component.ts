import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {
  sampleData = [
    {
      id: 1,
      name: "100m Dash",
      date: "2024-09-15",
      venue: "Olympic Stadium, Tokyo",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 2,
      name: "200m Sprint",
      date: "2024-10-20",
      venue: "National Stadium, Beijing",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 3,
      name: "400m Relay",
      date: "2024-11-05",
      venue: "Athletics Arena, London",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 4,
      name: "Marathon",
      date: "2024-09-25",
      venue: "Central Park, New York",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 5,
      name: "High Jump",
      date: "2024-12-10",
      venue: "Stade de France, Paris",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 6,
      name: "Long Jump",
      date: "2024-08-30",
      venue: "Berlin Olympic Stadium, Berlin",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 7,
      name: "Pole Vault",
      date: "2024-11-18",
      venue: "Olympiastadion, Munich",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 8,
      name: "400m Hurdles",
      date: "2024-10-15",
      venue: "National Stadium, Warsaw",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 9,
      name: "1500m Race",
      date: "2024-09-10",
      venue: "Olympic Park, Sydney",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 10,
      name: "5000m Run",
      date: "2024-12-01",
      venue: "Olympic Stadium, Athens",
      status: "Completed",
      action: "Edit"
    }
  ];


  constructor(private router:Router) {
  }

  addAthletes() {
    this.router.navigate([routes.addCompetition]);
  }

  viewDetails() {
    this.router.navigate([routes.competitionSummary]);
  }

  editCompetition(competitionId: any) {
    this.router.navigate([routes.addCompetition], {
      queryParams: {
        id: competitionId
      }
    });
  }

  startCompetition(id: any) {
    this.router.navigate([routes.startCompetition], {
      queryParams: {
        id: id
      }
    });
  }
}

