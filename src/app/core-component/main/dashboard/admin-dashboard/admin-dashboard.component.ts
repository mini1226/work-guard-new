import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  initChecked = false;
  public routes = routes;
  public currency!: string;


  constructor(private common: CommonService, private setting : SettingsService,private data: DataService,private pagination: PaginationService, private router: Router) {

  }
  sampleData1 = [
    {
      id: 1,
      name: "Running",
      date: "2024-12-06",
      venue: "Sugathadasa Stadium, Colombo",
      action: "Edit"
    },
    {
      id: 2,
      name: "Running",
      date: "2024-11-28",
      venue: "R Premadasa Stadium, Colombo",
      action: "Edit"
    },
    {
      id: 3,
      name: "Long Jump",
      date: "2024-11-05",
      venue: "Sugathadasa Stadium, Colombo",
      action: "Edit"
    },
    {
      id: 4,
      name: "Running",
      date: "2024-12-22",
      venue: "Pallekale Stadium, Kandy",
      action: "Edit"
    },
    {
      id: 5,
      name: "High Jump",
      date: "2024-12-10",
      venue: "Sugathadasa Stadium, Colombo",
      action: "Edit"
    },
    {
      id: 6,
      name: "Long Jump",
      date: "2024-12-30",
      venue: "De Soysa Stadium, Moratuwa",
      action: "Edit"
    },
    {
      id: 7,
      name: "Pole Vault",
      date: "2024-11-18",
      venue: "De Soysa Stadium, Moratuwa",
      action: "Edit"
    },
    {
      id: 8,
      name: "Running",
      date: "2024-12-15",
      venue: "International Stadium, Galle",
      action: "Edit"
    },
    {
      id: 9,
      name: "Yo Yo Test",
      date: "2024-11-30",
      venue: "CCC Grounds, Colombo",
      action: "Edit"
    },
    {
      id: 10,
      name: "Running",
      date: "2024-12-01",
      venue: "CCC Grounds, Colombo",
      action: "Edit"
    }
  ];


  sampleData2 = [
    {
      id: 1,
      name: "Sadun Fernando",
      email: "sandun.fer@example.com",
      device: "D001",
      gender: "Male",
      weight: 75,
      height: 180,
      action: "Edit",
      events: "1000m,3000m"
    },
    {
      id: 2,
      name: "Yasara Gunathilaka",
      email: "yasara.gun@example.com",
      device: "D002",
      gender: "Female",
      weight: 65,
      height: 165,
      action: "Edit",
      events: "10000m, Marathon"
    },
    {
      id: 3,
      name: "Budvin Perera",
      email: "budvin.perera@example.com",
      device: "D003",
      gender: "Male",
      weight: 82,
      height: 175,
      action: "Edit",
      events: "5000m,1000m,500m"
    },
    {
      id: 4,
      name: "Anuki Senevirathne",
      email: "anuki.sene@example.com",
      device: "D004",
      gender: "Female",
      weight: 58,
      height: 160,
      action: "Edit",
      events: "4000m,800m,1000m"
    },
    {
      id: 5,
      name: "Darshana Peiris",
      email: "darshana.peiris@example.com",
      device: "D005",
      gender: "Male",
      weight: 90,
      height: 185,
      action: "Edit",
      events: "1000m,800m,4000m"
    },
    {
      id: 6,
      name: "Sandali Senaratne",
      email: "sandali.sena@example.com",
      device: "D006",
      gender: "Female",
      weight: 70,
      height: 170,
      action: "Edit",
      events: "1000m,2000m"
    },
    {
      id: 7,
      name: "Kavidu Fonseka",
      email: "kavindu.fon@example.com",
      device: "D007",
      gender: "Male",
      weight: 68,
      height: 172,
      action: "Edit",
      events: "4000m,8000m,2000m"
    },
    {
      id: 8,
      name: "Binuli Athauda",
      email: "binuli.athauda@example.com",
      device: "D008",
      gender: "Female",
      weight: 60,
      height: 162,
      action: "Edit",
      events: "1000m,2000m"
    },
    {
      id: 9,
      name: "Prasad Gamage",
      email: "prasad.gamage@example.com",
      device: "D009",
      gender: "Male",
      weight: 85,
      height: 178,
      action: "Edit",
      events: "800m,2000m,1000m"
    },
    {
      id: 10,
      name: "Manoja Subasinghe",
      email: "manoja.subasinghe@example.com",
      device: "D0010",
      gender: "Female",
      weight: 55,
      height: 158,
      action: "Edit",
      events: "2000m,800m"
    }
  ];

  startCompetition() {
    this.router.navigate([routes.startCompetition]);
  }

  viewHistory() {
    this.router.navigate([routes.viewHistory]);
  }
}
