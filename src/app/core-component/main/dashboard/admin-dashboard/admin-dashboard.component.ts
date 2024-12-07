import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { apiResultFormat } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes';
import { CommonService } from 'src/app/core/service/common/common.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { SettingsService } from 'src/app/core/service/settings/settings.service';
import { expiredproduct } from 'src/app/shared/model/page.model';
import { PaginationService, pageSelection, tablePageSize } from 'src/app/shared/shared.index';
import Swal from 'sweetalert2';
import {SessionService} from "../../../../core/service/sessions/session.service";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  initChecked = false;
  public routes = routes;
  public currency!: string;

  completedAthleteCount: any;
  athleteCount: any;
  sessionCount: any;

  upcomingData: any[] = [];
  historyData: any[] = [];


  constructor(private common: CommonService,
              private setting : SettingsService,
              private data: DataService,
              private sessionService: SessionService,
              private athleteService: AthleteService,
              private pagination: PaginationService,
              private router: Router) {
  }




  ngOnInit(): void {
    this.getCompletedSessionCount();
    this.getAthleteCount();
    this.getUpcomingData();
    this.getSessionCount();
    this.getAthleteAll();
  }


  startCompetition(id: any) {
    this.router.navigate([routes.startCompetition], {
      queryParams: {
        id: id
      }
    });
  }



  viewHistory(id: any) {
    this.router.navigate([routes.viewHistory], {
      queryParams: {
        id: id
      }
    });
  }


  private getCompletedSessionCount(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const userId = localStorage.getItem('userId');

      // Check if userId is null
      if (!userId) {
        console.error('User ID is missing from localStorage');
        resolve(false);
        return;  // Exit early if userId is null
      }

      // Prepare FormData with coach_id as userId
      const formData = new FormData();
      formData.append('coach_id', userId);

      // Call the API with the FormData
      this.sessionService.getCompletedSessionCount(formData).subscribe(
        (apiRes: any) => {
          this.completedAthleteCount = apiRes;
          resolve(true);
        },
        (error: any) => {
          console.error('Error fetching session count:', error);
          resolve(false);
        }
      );
    });
  }



  private getAthleteCount(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const userId = localStorage.getItem('userId');

      // Check if userId is null
      if (!userId) {
        console.error('User ID is missing from localStorage');
        resolve(false);
        return;  // Exit early if userId is null
      }

      // Prepare FormData with coach_id as userId
      const formData = new FormData();
      formData.append('coach_id', userId);

      // Call the API with the FormData
      this.athleteService.getAthleteCount(formData).subscribe(
        (apiRes: any) => {
          this.athleteCount = apiRes;
          resolve(true);
        },
        (error: any) => {
          console.error('Error fetching session count:', error);
          resolve(false);
        }
      );
    });
  }



  private getSessionCount(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const userId = localStorage.getItem('userId');

      // Check if userId is null
      if (!userId) {
        console.error('User ID is missing from localStorage');
        resolve(false);
        return;  // Exit early if userId is null
      }

      // Prepare FormData with coach_id as userId
      const formData = new FormData();
      formData.append('coach_id', userId);

      // Call the API with the FormData
      this.sessionService.getAllSessionCount(formData).subscribe(
        (apiRes: any) => {
          this.sessionCount = Number(apiRes);
          resolve(true);
        },
        (error: any) => {
          console.error('Error fetching session count:', error);
          resolve(false);
        }
      );
    });
  }




  private getUpcomingData(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.sessionService.getUpcomingSession().subscribe(
        (apiRes: any) => {
          this.upcomingData = apiRes;
          resolve(true);
        },(error:any) => {
          resolve(false);
        }
      );
    })
  }




  private getAthleteAll(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const userId = localStorage.getItem('userId');

      // Check if userId is null
      if (!userId) {
        console.error('User ID is missing from localStorage');
        resolve(false);
        return;  // Exit early if userId is null
      }

      // Prepare FormData with coach_id as userId
      const formData = new FormData();
      formData.append('coach_id', userId);

      // Call the API with FormData
      this.athleteService.getAthleteAll(userId).subscribe(
        (apiRes: any) => {
          this.historyData = apiRes;
          resolve(true);
        },
        (error: any) => {
          console.error('Error fetching session count:', error);
          resolve(false);
        }
      );
    });
  }



}
