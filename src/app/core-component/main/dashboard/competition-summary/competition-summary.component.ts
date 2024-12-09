import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {SessionService} from "../../../../core/service/sessions/session.service";
import {CommonService} from "../../../../core/service/common/common.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-competition-summary',
  templateUrl: './competition-summary.component.html',
  styleUrl: './competition-summary.component.scss'
})
export class CompetitionSummaryComponent {
  public routes = routes;
  isEditId: any;
  historyData: any[] = [];

  constructor(private route: ActivatedRoute,
              private sessionService: SessionService, private datePipe: DatePipe,
              private router: Router, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
    this.loadAllSessionistory();

  }


  onBackClick() {
    window.history.back();
  }

  reset() {
  }


  onSubmit(): void {
  }

  viewDetails(project: any) {
    let startTime: any = this.datePipe.transform(project.start_time, 'YYYY-MM-dd HH:mm:ss:SSS');
    this.commonService.individualRaceEndTime(startTime, project.time).then((endTime: string) => {
      const x = {
        device: project.device_id,
        startTime: startTime,
        endTime: endTime,
        athleteHR:Number(project.average_heart_rate).toFixed(2)
      }
      this.router.navigate([routes.liveHeartRate], {queryParams: x});
    })
  }

  private loadAllSessionistory() {
    this.sessionService.getSessionHistory(this.isEditId).subscribe(value => {
      this.historyData = value;
    })
  }
}
