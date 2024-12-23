import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {SessionService} from "../../../../core/service/sessions/session.service";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {
  sampleData = [
    {
      id: 1,
      name: "Running",
      date: "2024-09-15",
      venue: "Sugathadasa Stadium, Colombo",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 2,
      name: "Running",
      date: "2024-09-28",
      venue: "R Premadasa Stadium, Colombo",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 3,
      name: "Long Jump",
      date: "2024-11-05",
      venue: "Sugathadasa Stadium, Colombo",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 4,
      name: "Running",
      date: "2024-09-25",
      venue: "Pallekale Stadium, Kandy",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 5,
      name: "High Jump",
      date: "2024-12-10",
      venue: "Sugathadasa Stadium, Colombo",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 6,
      name: "Long Jump",
      date: "2024-12-30",
      venue: "De Soysa Stadium, Moratuwa",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 7,
      name: "Pole Vault",
      date: "2024-11-18",
      venue: "De Soysa Stadium, Colombo",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 8,
      name: "Running",
      date: "2024-08-15",
      venue: "International Stadium, Galle",
      status: "Completed",
      action: "Edit"
    },
    {
      id: 9,
      name: "Yo Yo Test",
      date: "2024-11-30",
      venue: "CCC Grounds, Colombo",
      status: "Not Completed",
      action: "Edit"
    },
    {
      id: 10,
      name: "Running",
      date: "2024-12-01",
      venue: "CCC Grounds, Colombo",
      status: "Completed",
      action: "Edit"
    }
  ];

  sessions: Array<any> = [];


  constructor(private router: Router,
              private sessionService: SessionService,) {
    this.loadAllSessions();
  }

  addAthletes() {
    this.router.navigate([routes.addCompetition]);
  }

  viewDetails(comId: any) {
    this.router.navigate([routes.competitionSummary], {
      queryParams: {
        id: comId
      }
    });
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

  private loadAllSessions() {
    this.sessionService.getAllSessionDetails(localStorage.getItem('userId')).subscribe(value => {
      this.sessions = value;
      console.log(value);
    })
  }
}

