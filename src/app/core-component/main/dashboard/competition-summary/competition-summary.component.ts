import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";

@Component({
  selector: 'app-competition-summary',
  templateUrl: './competition-summary.component.html',
  styleUrl: './competition-summary.component.scss'
})
export class CompetitionSummaryComponent {
  public routes = routes;
  isEditId: any;

  sampleData = [
    { id: 1, name: 'John Doe', avgHr: 145, performance: '00:00:09.58', maxHrExceeded: 'No' },
    { id: 2, name: 'Jane Smith', avgHr: 155, performance: '00:00:21.34', maxHrExceeded: 'Yes' },
    { id: 3, name: 'Michael Johnson', avgHr: 150, performance: '00:00:43.18', maxHrExceeded: 'No' },
    { id: 4, name: 'Emily Davis', avgHr: 160, performance: '00:02:01.23', maxHrExceeded: 'Yes' },
    { id: 5, name: 'Chris Lee', avgHr: 140, performance: '00:03:37.50', maxHrExceeded: 'No' },
    { id: 6, name: 'Sophia Brown', avgHr: 170, performance: '00:13:09.35', maxHrExceeded: 'Yes' },
    { id: 7, name: 'Daniel Wilson', avgHr: 135, performance: '00:27:10.50', maxHrExceeded: 'No' },
    { id: 8, name: 'Laura Green', avgHr: 165, performance: '02:22:15', maxHrExceeded: 'Yes' },
    { id: 9, name: 'David Clark', avgHr: 155, performance: '00:00:12.98', maxHrExceeded: 'No' },
    { id: 10, name: 'Sarah White', avgHr: 145, performance: '00:00:52.16', maxHrExceeded: 'No' }
  ];




  constructor(private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

  }


  onBackClick() {
    window.history.back();
  }

  reset(){
  }


  onSubmit(): void {
  }

  viewDetails(projectId: any) {
    this.router.navigate([routes.viewHeartRate], {
      queryParams: {
        id: projectId
      }
    });
  }
}
