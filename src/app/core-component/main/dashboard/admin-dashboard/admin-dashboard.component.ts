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
      name: "100m Dash",
      date: "2024-09-15",
      venue: "Olympic Stadium, Tokyo",
      action: "Edit"
    },
    {
      id: 2,
      name: "200m Sprint",
      date: "2024-10-20",
      venue: "National Stadium, Beijing",
      action: "Edit"
    },
    {
      id: 3,
      name: "400m Relay",
      date: "2024-11-05",
      venue: "Athletics Arena, London",
      action: "Edit"
    },
    {
      id: 4,
      name: "Marathon",
      date: "2024-09-25",
      venue: "Central Park, New York",
      action: "Edit"
    },
    {
      id: 5,
      name: "High Jump",
      date: "2024-12-10",
      venue: "Stade de France, Paris",
      action: "Edit"
    },
    {
      id: 6,
      name: "Long Jump",
      date: "2024-08-30",
      venue: "Berlin Olympic Stadium, Berlin",
      action: "Edit"
    },
    {
      id: 7,
      name: "Pole Vault",
      date: "2024-11-18",
      venue: "Olympiastadion, Munich",
      action: "Edit"
    },
    {
      id: 8,
      name: "400m Hurdles",
      date: "2024-10-15",
      venue: "National Stadium, Warsaw",
      action: "Edit"
    },
    {
      id: 9,
      name: "1500m Race",
      date: "2024-09-10",
      venue: "Olympic Park, Sydney",
      action: "Edit"
    },
    {
      id: 10,
      name: "5000m Run",
      date: "2024-12-01",
      venue: "Olympic Stadium, Athens",
      action: "Edit"
    }
  ];


  sampleData2 = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      device: "D001",
      gender: "Male",
      weight: 75,
      height: 180,
      action: "Edit",
      events: "100m,200m,800m"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      device: "D002",
      gender: "Female",
      weight: 65,
      height: 165,
      action: "Edit",
      events: "200m,400m,100m"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      device: "D003",
      gender: "Male",
      weight: 82,
      height: 175,
      action: "Edit",
      events: "100m,400m,200m"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      device: "D004",
      gender: "Female",
      weight: 58,
      height: 160,
      action: "Edit",
      events: "400m,800m,100m"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      device: "D005",
      gender: "Male",
      weight: 90,
      height: 185,
      action: "Edit",
      events: "100m,800m,400m"
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      device: "D006",
      gender: "Female",
      weight: 70,
      height: 170,
      action: "Edit",
      events: "100m,200m,800m"
    },
    {
      id: 7,
      name: "James Lee",
      email: "james.lee@example.com",
      device: "D007",
      gender: "Male",
      weight: 68,
      height: 172,
      action: "Edit",
      events: "400m,800m,200m"
    },
    {
      id: 8,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      device: "D008",
      gender: "Female",
      weight: 60,
      height: 162,
      action: "Edit",
      events: "100m,200m,400m"
    },
    {
      id: 9,
      name: "Daniel White",
      email: "daniel.white@example.com",
      device: "D009",
      gender: "Male",
      weight: 85,
      height: 178,
      action: "Edit",
      events: "800m,200m,100m"
    },
    {
      id: 10,
      name: "Isabella Garcia",
      email: "isabella.garcia@example.com",
      device: "D0010",
      gender: "Female",
      weight: 55,
      height: 158,
      action: "Edit",
      events: "400m,200m,800m"
    }
  ];

  startCompetition() {
    this.router.navigate([routes.startCompetition]);
  }

  viewHistory() {
    this.router.navigate([routes.viewHistory]);
  }
}
