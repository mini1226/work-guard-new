import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { sharedModule } from 'src/app/shared/shared.module';
import {AthleteComponent} from "./athlete/athlete.component";
import {CompetitionComponent} from "./competition/competition.component";
import {AthleteFormComponent} from "./athlete-form/athlete-form.component";
import {CompetitionFormComponent} from "./competition-form/competition-form.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {StartCompetitionComponent} from "./start-competition/start-competition.component";
import {ViewHistoryComponent} from "./view-history/view-history.component";
import {CompetitionSummaryComponent} from "./competition-summary/competition-summary.component";
import {HeartRateGraphComponent} from "./heart-rate-graph/heart-rate-graph.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {LiveHeartRateComponent} from "./live-heart-rate/live-heart-rate.component";
import {PerformanceCalculatorComponent} from "./performance-calculator/performance-calculator.component";
import {AthletePerformanceHistoryComponent} from "./athlete-performance-history/athlete-performance-history.component";

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    SalesDashboardComponent,
    AthleteComponent,
    CompetitionComponent,
    AthleteFormComponent,
    CompetitionFormComponent,
    StartCompetitionComponent,
    ViewHistoryComponent,
    CompetitionSummaryComponent,
    HeartRateGraphComponent,
    LiveHeartRateComponent,
    PerformanceCalculatorComponent,
    AthletePerformanceHistoryComponent
  ],
  imports: [CommonModule,
    DashboardRoutingModule,
    sharedModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    NgApexchartsModule
  ],
})
export class DashboardModule {}
