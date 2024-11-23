import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {SessionService} from "../../../../core/service/sessions/session.service";

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
              private sessionService: SessionService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
    this.loadAllSessionistory();

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


  private loadAllSessionistory() {
    this.sessionService.getSessionHistory(this.isEditId).subscribe(value => {
      this.historyData=value;
      // this.sampleData
    })
  }
}
