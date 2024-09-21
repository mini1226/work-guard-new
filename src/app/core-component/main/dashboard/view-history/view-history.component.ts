import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
    { id: 1, name: 'John Doe', competitionName: '100m Sprint', date: '2024-08-12', performance: '00:00:09.58',maxHrExceeded: 'No' },
    { id: 2, name: 'Jane Smith', competitionName: '200m Sprint', date: '2024-08-13', performance: '00:00:21.34',maxHrExceeded: 'No' },
    { id: 3, name: 'Michael Johnson', competitionName: '400m Sprint', date: '2024-08-14', performance: '00:00:43.18',maxHrExceeded: 'No' },
    { id: 4, name: 'Emily Davis', competitionName: '800m Run', date: '2024-08-15', performance: '00:02:01.23',maxHrExceeded: 'Yes' },
    { id: 5, name: 'Chris Lee', competitionName: '1500m Run', date: '2024-08-16', performance: '00:03:37.50',maxHrExceeded: 'No' },
    { id: 6, name: 'Sophia Brown', competitionName: '5000m Run', date: '2024-08-17', performance: '00:13:09.35',maxHrExceeded: 'No' },
    { id: 7, name: 'Daniel Wilson', competitionName: '10000m Run', date: '2024-08-18', performance: '00:27:10.50',maxHrExceeded: 'No' },
    { id: 8, name: 'Laura Green', competitionName: 'Marathon', date: '2024-08-19', performance: '02:22:15',maxHrExceeded: 'Yes' },
    { id: 9, name: 'David Clark', competitionName: '110m Hurdles', date: '2024-08-20', performance: '00:00:12.98',maxHrExceeded: 'No' },
    { id: 10, name: 'Sarah White', competitionName: '400m Hurdles', date: '2024-08-21', performance: '00:00:52.16',maxHrExceeded: 'No' }
  ];



  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }


  onBackClick() {
    window.history.back();
  }

  reset(){
  }


  onSubmit(): void {
  }
}
