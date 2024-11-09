import {Component, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexYAxis, ChartComponent} from "ng-apexcharts";
import {ActivatedRoute} from "@angular/router";
import {Database, onValue, ref} from "@angular/fire/database";


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

  private heartRateValues: any[] = [];
  private timeInSeconds: any[] = [];
  private timeInSeconds1: any[] = [];

  constructor(private route: ActivatedRoute, private af: Database) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let databaseReference = ref(this.af, 'D001/BPM');
    onValue(databaseReference, snapshot => {
      if (snapshot.val() != null) {
        let strings:string[] = Object.keys(snapshot.val());
        let values:number[] = Object.values(snapshot.val());
        this.timeInSeconds1 = strings.splice( strings.length - 60,strings.length);
        this.heartRateValues =values.splice(values.length - 60,values.length);
        this.initializeHeartRateData()
      }
    })

  }

  initializeHeartRateData() {
    this.timeInSeconds = Array.from({length: this.timeInSeconds1.length}, (_, i) => i);
    this.initializeLineChart()
  }

  initializeLineChart() {
    this.lineChartOptions = {
      series: [
        {
          name: "Heart Rate",
          data: this.heartRateValues
        }
      ],
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      chart: {
        type: "line",
        height: 350
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
