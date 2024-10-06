import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";

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

  // Store heart rate data for the last five sessions
  public heartRateData: number[][] = [];
  private timeInSeconds: number[] = [];


  public heartRateTableData: {
    date: string;               // Date of the session
    heartRateRange: string;     // Range of heart rates
    maxHrExceed: boolean;       // Whether the max heart rate was exceeded
    pace: string;               // Pace information
    avgHeartRate: number;       // Average heart rate for the session
    summary: string;            // Summary of the session
    feedback: string;           // Feedback for the session
  }[] = [
    {
      date: '2023-10-01',
      heartRateRange: '70-90',
      maxHrExceed: false,
      pace: '5.00',
      avgHeartRate: 80,
      summary: 'Initial State.',
      feedback: 'Keep up the good pace!'
    },
    {
      date: '2023-10-02',
      heartRateRange: '72-92',
      maxHrExceed: true,
      pace: '5.30',
      avgHeartRate: 85,
      summary: 'Increased Hr',
      feedback: 'Monitor your heart rate closely.'
    },
    {
      date: '2023-10-03',
      heartRateRange: '68-88',
      maxHrExceed: false,
      pace: '5.10',
      avgHeartRate: 78,
      summary: 'Felt good throughout the run.',
      feedback: 'Try to increase the distance next time.'
    },
    {
      date: '2023-10-04',
      heartRateRange: '75-95',
      maxHrExceed: true,
      pace: '4.50',
      avgHeartRate: 90,
      summary: 'Pushed hard, great effort!',
      feedback: 'Be cautious with high intensity.'
    },
    {
      date: '2023-10-05',
      heartRateRange: '70-85',
      maxHrExceed: false,
      pace: '5.20',
      avgHeartRate: 82,
      summary: 'Steady pace, maintained energy.',
      feedback: 'Good job, keep training consistently!'
    }
  ];



  ngOnInit(): void {
    this.initializeHeartRateData();
    this.initializeLineChart();
  }

  // Function to initialize hardcoded heart rate data for 5 sessions
  initializeHeartRateData() {
    // Generate heart rate data for 5 sessions
    this.heartRateData = [
      [72, 74, 73, 75, 77, 76, 75, 78, 80, 81, 83, 85, 84, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 74, 75, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
      [70, 72, 71, 74, 75, 77, 78, 79, 80, 82, 81, 80, 78, 76, 75, 73, 74, 76, 78, 80, 82, 81, 79, 77, 76, 74, 73, 72, 71, 70, 68, 67, 66, 68, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 80, 78, 76, 75, 73, 72, 70, 69, 68, 67, 66, 65, 64],
      // Add three more sessions with dummy data
      [75, 76, 77, 78, 79, 80, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 61, 63, 65, 67, 68, 69, 70, 72, 74, 75, 76, 77, 78, 79, 80, 81, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69],
      [68, 69, 70, 71, 72, 73, 74, 76, 78, 80, 82, 84, 86, 88, 89, 90, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 61, 63, 65, 67, 69, 70, 72, 74, 76, 78],
      [62, 64, 66, 68, 70, 72, 74, 76, 77, 78, 79, 80, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36]
    ];

    // Time in seconds from 0 to 59
    this.timeInSeconds = Array.from({ length: 60 }, (_, i) => i);
  }

  // Function to initialize the line chart with heart rate data
  initializeLineChart() {
    // Prepare series data for the last 5 sessions
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
        categories: this.timeInSeconds, // X-axis representing seconds (0-59)
        title: {
          text: "Time (seconds)"
        }
      },
      yaxis: {
        title: {
          text: "Heart Rate (BPM)"
        },
        min: 50, // Adjust according to the minimum heart rate
        max: 100 // Adjust according to the maximum heart rate
      },
      stroke: {
        curve: 'smooth' // Smooth line
      },
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
