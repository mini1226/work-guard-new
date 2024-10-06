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
    { id: 1, name: 'John Doe', avgHr: 145, performance: '00:00:09.58', maxHrExceeded: 'No', distance: '100m', cal: 10, cardiovascularDrift: 1.2 },
    { id: 2, name: 'Jane Smith', avgHr: 155, performance: '00:00:21.34', maxHrExceeded: 'Yes', distance: '200m', cal: 25, cardiovascularDrift: 1.8 },
    { id: 3, name: 'Michael Johnson', avgHr: 150, performance: '00:00:43.18', maxHrExceeded: 'No', distance: '400m', cal: 40, cardiovascularDrift: 2.1 },
    { id: 4, name: 'Emily Davis', avgHr: 160, performance: '00:02:01.23', maxHrExceeded: 'Yes', distance: '800m', cal: 75, cardiovascularDrift: 2.5 },
    { id: 5, name: 'Chris Lee', avgHr: 140, performance: '00:03:37.50', maxHrExceeded: 'No', distance: '1500m', cal: 100, cardiovascularDrift: 1.9 },
    { id: 6, name: 'Sophia Brown', avgHr: 170, performance: '00:13:09.35', maxHrExceeded: 'Yes', distance: '5000m', cal: 320, cardiovascularDrift: 3.1 },
    { id: 7, name: 'Daniel Wilson', avgHr: 135, performance: '00:27:10.50', maxHrExceeded: 'No', distance: '10000m', cal: 600, cardiovascularDrift: 2.9 },
    { id: 8, name: 'Laura Green', avgHr: 165, performance: '02:22:15', maxHrExceeded: 'Yes', distance: '42.195km', cal: 2000, cardiovascularDrift: 4.0 },
    { id: 9, name: 'David Clark', avgHr: 155, performance: '00:00:12.98', maxHrExceeded: 'No', distance: '110m', cal: 15, cardiovascularDrift: 1.3 },
    { id: 10, name: 'Sarah White', avgHr: 145, performance: '00:00:52.16', maxHrExceeded: 'No', distance: '400m', cal: 55, cardiovascularDrift: 2.2 }
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

  performanceHistory(){

  }
}
