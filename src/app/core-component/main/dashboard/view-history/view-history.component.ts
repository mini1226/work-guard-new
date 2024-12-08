import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {DatePipe} from "@angular/common";
import {CommonService} from "../../../../core/service/common/common.service";

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
              private router: Router, private datePipe: DatePipe, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
    this.loadAllAthleteHistory();
  }


  onBackClick() {
    window.history.back();
  }

  reset() {
  }


  onSubmit(): void {
  }

  performanceHistory() {
    console.log(this.historyData.slice(0, 5));
    this.router.navigate([routes.athletePerformance], {queryParams: {data: JSON.stringify(this.historyData.slice(0, 5))}});
  }

  viewDetails(project: any) {
    let startTime: any = this.datePipe.transform(project.start_time, 'YYYY-MM-dd HH:mm:ss:SSS');
    this.commonService.individualRaceEndTime(startTime, project.duration).then((endTime: string) => {
      const x = {
        device: project.device_id,
        startTime: startTime,
        endTime: endTime,
        athleteHR:project.heart_rate_detail
      }
      this.router.navigate([routes.liveHeartRate], {queryParams: x});
    })
  }


  private loadAllAthleteHistory() {
    this.athleteService.getAthleteHistory(this.isEditId).subscribe(value => {
      this.historyData = value;
    })
  }
}
