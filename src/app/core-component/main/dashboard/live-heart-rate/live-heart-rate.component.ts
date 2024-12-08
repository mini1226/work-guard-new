import {Component, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexYAxis, ChartComponent} from "ng-apexcharts";
import {ActivatedRoute} from "@angular/router";
import {Database, endAt, onValue, orderByChild, query, ref, set, startAt} from "@angular/fire/database";


export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  labels: any;
  responsive: any[];
};


@Component({
  selector: 'app-live-heart-rate',
  templateUrl: './live-heart-rate.component.html',
  styleUrl: './live-heart-rate.component.scss'
})
export class LiveHeartRateComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public lineChartOptions: Partial<LineChartOptions> | any = {};
  device: string;
  athleteHR: any;
  private heartRateValues: any[] = [];
  private timeInSeconds: any[] = [];
  private avgRate: any[] = [];

  constructor(private route: ActivatedRoute, private af: Database) {
    let device: any = this.route.snapshot.queryParamMap.get('device');
    this.device = device;
    let startTime: any = this.route.snapshot.queryParamMap.get('startTime');
    let endTime: any = this.route.snapshot.queryParamMap.get('endTime');
    this.athleteHR = this.route.snapshot.queryParamMap.get('athleteHR');

    console.log(startTime);
    startTime = startTime.split(' ')[1];
    this.getData(device, startTime, endTime);
  }

  ngOnInit(): void {
    this.initializeHeartRateData()

  }

  getData(device: string, startTime: string, endTime: string) {
    let databaseReference = ref(this.af, device + '/BPM');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(res, snapshot => {
      console.log(snapshot.val());
      if (snapshot.val() != null) {
        let numbers: number[] = Object.values(snapshot.val());
        this.heartRateValues = numbers.map((res: any) => {
          return res.BPM_VALUE
        });
        console.log(this.heartRateValues);
        this.avgRate=[];
        this.avgRate.push(...Array.from({ length: this.heartRateValues.length }, () => Number(this.athleteHR)));
        this.initializeHeartRateData()
      }
    })

  }

  initializeHeartRateData() {
    this.initializeLineChart()
  }

  initializeLineChart() {
    this.lineChartOptions = {
      series: [
        {
          name: "Heart Rate",
          data: this.heartRateValues
        },
        {
          name: "Average HR Rate",
          type: "line",
          data: this.avgRate,
          animations: {
            enabled: false, // Disable animations
          },
        }
      ],
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      chart: {
        type: "line",
        height: 350,
        animations: {
          enabled: false,
          speed: 100,
          animateGradually: {
            enabled: false,
            delay: 500
          },
          dynamicAnimation: {
            enabled: false,
            speed: 150
          }
        }
      },
      xaxis: {
        categories: this.timeInSeconds, // X-axis representing seconds (0-59)
        title: {
          text: "Time (seconds)"
        }
      },
      yaxis: {
        title: {
          text: "Heart Rate (BPM)"
        }
      },
      stroke: {
        curve: 'smooth'
      },
      labels: this.timeInSeconds,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  onBackClick() {
    window.history.back();
  }

  reset() {
    // Reset logic here
  }

  onSubmit(): void {
    // Submit logic here
  }

}
