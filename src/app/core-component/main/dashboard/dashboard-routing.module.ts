import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import {AthleteComponent} from "./athlete/athlete.component";
import {CompetitionComponent} from "./competition/competition.component";
import {AthleteFormComponent} from "./athlete-form/athlete-form.component";
import {CompetitionFormComponent} from "./competition-form/competition-form.component";
import {StartCompetitionComponent} from "./start-competition/start-competition.component";
import {ViewHistoryComponent} from "./view-history/view-history.component";
import {CompetitionSummaryComponent} from "./competition-summary/competition-summary.component";
import {HeartRateGraphComponent} from "./heart-rate-graph/heart-rate-graph.component";
import {LiveHeartRateComponent} from "./live-heart-rate/live-heart-rate.component";

const routes: Routes = [{ path: '', component: DashboardComponent,
children: [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin-dashboard'
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'sales-dashboard',
    component: SalesDashboardComponent
  },
  {
    path: 'athletes',
    component: AthleteComponent
  },
  {
    path: 'competition',
    component: CompetitionComponent
  },
  {
    path: 'add-athlete',
    component: AthleteFormComponent
  },
  {
    path: 'add-competition',
    component: CompetitionFormComponent
  },
  {
    path: 'start-competition',
    component: StartCompetitionComponent
  },
  {
    path: 'view-history',
    component: ViewHistoryComponent
  },
  {
    path: 'view-summary',
    component: CompetitionSummaryComponent
  },
  {
    path: 'view-heart-rate',
    component: HeartRateGraphComponent
  },
  {
    path: 'live-heart-rate',
    component: LiveHeartRateComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
