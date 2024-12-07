import {Component, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexYAxis, ChartComponent} from "ng-apexcharts";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Database, endAt, onValue, orderByChild, query, ref, startAt} from "@angular/fire/database";
import {CommonService} from "../../../../core/service/common/common.service";

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
  selector: 'app-athlete-performance-history',
  templateUrl: './athlete-performance-history.component.html',
  styleUrls: ['./athlete-performance-history.component.scss']
})
export class AthletePerformanceHistoryComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public lineChartOptions: Partial<LineChartOptions> | any = {};
  public heartRateData: number[][] = [];
  public heartRateTableData: any[] = [];
  private timeInSeconds: number[] = [];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private af: Database, private commonService: CommonService) {
    this.route.queryParams.subscribe(params => {
      this.heartRateTableData = JSON.parse(params['data']);
      for (let i = 0; i < this.heartRateTableData.length; i++) {
        let lastFiveElement = this.heartRateTableData[i];
        let transform: any = this.datePipe.transform(lastFiveElement.start_time, 'YYYY-MM-dd HH:mm:ss');
        this.commonService.individualRaceEndTime(transform, lastFiveElement.duration).then((endTime: string) => {
          this.getData('D001', transform, endTime)
        });
      }
    });
  }

  getData(device: string, startTime: string, endTime: string) {
    let databaseReference = ref(this.af, device + '/BPM');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(res, snapshot => {
      if (snapshot.val() != null) {
        let values: number[] = Object.values(snapshot.val());
        this.heartRateData.push(values.map((res: any) => {
          return res.BPM_VALUE
        }))
        this.initializeLineChart();
      }
    })

  }

  ngOnInit(): void {

  }

  initializeLineChart() {
    const series = this.heartRateData.map((data, index) => ({
      name: `Session ${index + 1}`,
      data: data
    }));

    this.lineChartOptions = {
      series: series,
      chart: {
        type: "line",
        height: 350
      },
      xaxis: {
        categories: this.timeInSeconds,
        title: {text: "Time (seconds)"}
      },
      yaxis: {
        title: {text: "Heart Rate (BPM)"},
        min: 50,
        // max: 100
      },
      stroke: {curve: 'smooth'},
      colors: ["#FF4560", "#775DD0", "#00E396", "#FEB019", "#008FFB"], // Customize colors
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {width: 300},
            legend: {position: 'bottom'}
          }
        }
      ]
    };
  }


  getAverageHeartRate(session: number[]): number {
    return session.reduce((a, b) => a + b, 0) / session.length;
  }

  getMaxHeartRate(session: number[]): number {
    return session.reduce((a, b) => Math.max(a, b), -Infinity);
  }

  getMinHeartRate(session: number[]): number {
    return session.reduce((a, b) => Math.min(a, b), Infinity);
  }

}
