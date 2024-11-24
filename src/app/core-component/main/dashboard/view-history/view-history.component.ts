import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.scss'
})
export class ViewHistoryComponent {
  public routes = routes;
  isEditId: any;
  historyData: any[] = [];

  constructor(private route: ActivatedRoute,
              private athleteService: AthleteService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
    this.loadAllAthleteHistory();
  }


  onBackClick() {
    window.history.back();
  }

  reset(){
  }


  onSubmit(): void {
  }

  performanceHistory(){
    console.log(this.historyData.slice(0, 5));
    this.router.navigate([routes.athletePerformance],{queryParams:{data:JSON.stringify(this.historyData.slice(0, 5))}});
  }

  viewDetails(id: any) {
    this.router.navigate([routes.viewHeartRate], {
      queryParams: {
        id: id
      }
    });
  }


  private loadAllAthleteHistory() {
    this.athleteService.getAthleteHistory(this.isEditId).subscribe(value => {
      this.historyData=value;
      // this.sampleData
    })
  }
}
