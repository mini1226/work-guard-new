import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.scss'
})
export class ViewHistoryComponent {
  public routes = routes;
  isEditId: any;

  sampleData = [
    { id: 1, name: 'John Doe', competitionName: '100m Sprint', date: '2024-08-12', performance: '00:00:09.58', distance: '100m', hrRange: '120-160 bpm', maxHrExceeded: 'No', cal: 10, cardiovascularDrift: 1.2 },
    { id: 2, name: 'Jane Smith', competitionName: '200m Sprint', date: '2024-08-13', performance: '00:00:21.34', distance: '200m', hrRange: '130-170 bpm', maxHrExceeded: 'No', cal: 25, cardiovascularDrift: 1.5 },
    { id: 3, name: 'Michael Johnson', competitionName: '400m Sprint', date: '2024-08-14', performance: '00:00:43.18', distance: '400m', hrRange: '140-180 bpm', maxHrExceeded: 'No', cal: 40, cardiovascularDrift: 1.8 },
    { id: 4, name: 'Emily Davis', competitionName: '800m Run', date: '2024-08-15', performance: '00:02:01.23', distance: '800m', hrRange: '150-190 bpm', maxHrExceeded: 'Yes', cal: 75, cardiovascularDrift: 2.2 },
    { id: 5, name: 'Chris Lee', competitionName: '1500m Run', date: '2024-08-16', performance: '00:03:37.50', distance: '1500m', hrRange: '140-180 bpm', maxHrExceeded: 'No', cal: 110, cardiovascularDrift: 2.0 },
    { id: 6, name: 'Sophia Brown', competitionName: '5000m Run', date: '2024-08-17', performance: '00:13:09.35', distance: '5000m', hrRange: '130-170 bpm', maxHrExceeded: 'No', cal: 300, cardiovascularDrift: 2.8 },
    { id: 7, name: 'Daniel Wilson', competitionName: '10000m Run', date: '2024-08-18', performance: '00:27:10.50', distance: '10000m', hrRange: '120-160 bpm', maxHrExceeded: 'No', cal: 550, cardiovascularDrift: 3.1 },
    { id: 8, name: 'Laura Green', competitionName: 'Marathon', date: '2024-08-19', performance: '02:22:15', distance: '42.195km', hrRange: '140-185 bpm', maxHrExceeded: 'Yes', cal: 2200, cardiovascularDrift: 4.5 },
    { id: 9, name: 'David Clark', competitionName: '110m Hurdles', date: '2024-08-20', performance: '00:00:12.98', distance: '110m', hrRange: '130-175 bpm', maxHrExceeded: 'No', cal: 12, cardiovascularDrift: 1.3 },
    { id: 10, name: 'Sarah White', competitionName: '400m Hurdles', date: '2024-08-21', performance: '00:00:52.16', distance: '400m', hrRange: '140-185 bpm', maxHrExceeded: 'No', cal: 60, cardiovascularDrift: 2.5 }
  ];



  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

  }


  onBackClick() {
    window.history.back();
  }

  reset(){
  }


  onSubmit(): void {
  }

  performanceHistory(){
    this.router.navigate([routes.athletePerformance]);
  }

  viewDetails(id: any) {
    this.router.navigate([routes.viewHeartRate], {
      queryParams: {
        id: id
      }
    });
  }
}
