import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexStroke, ChartComponent } from "ng-apexcharts";

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
  selector: 'app-heart-rate-graph',
  templateUrl: './heart-rate-graph.component.html',
  styleUrls: ['./heart-rate-graph.component.scss']
})
export class HeartRateGraphComponent {

  @ViewChild("chart") chart!: ChartComponent;
  public lineChartOptions: Partial<LineChartOptions> | any = {};

  private heartRateValues: number[] = [];
  private timeInSeconds: number[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeHeartRateData();
    this.initializeLineChart();
  }

  // Function to initialize hardcoded heart rate data
  initializeHeartRateData() {
    // Hardcoded heart rate values for 60 seconds
    this.heartRateValues = [
      72, 74, 73, 75, 77, 76, 75, 78, 80, 81,
      83, 85, 84, 82, 81, 80, 79, 78, 77, 76,
      75, 74, 73, 72, 74, 75, 77, 78, 79, 81,
      82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
      90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
      80, 79, 78, 77, 76, 75, 74, 73, 72, 71
    ];

    // Time in seconds from 0 to 59
    this.timeInSeconds = Array.from({ length: 60 }, (_, i) => i);
  }

  // Function to initialize the line chart with heart rate data
  initializeLineChart() {
    this.lineChartOptions = {
      series: [
        {
          name: "Heart Rate",
          data: this.heartRateValues
        }
      ],
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
        },
        min: 60, // Adjust according to the minimum heart rate
        max: 100 // Adjust according to the maximum heart rate
      },
      stroke: {
        curve: 'smooth' // Smooth line
      },
      labels: this.timeInSeconds,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
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
