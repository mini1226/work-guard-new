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
    date: string;
    heartRateRange: string;
    maxHrExceed: boolean;
    pace: string;
    avgHeartRate: number;
    summary: string;
    feedback: string;
  }[] = [
    {
      date: '2023-10-01',
      heartRateRange: '70-90',
      maxHrExceed: false,
      pace: '5.00',
      avgHeartRate: 80,
      summary: 'Same pace, same heart rate.',
      feedback: 'You’re consistent. But to see improvement, consider increasing intensity slightly or introducing interval training.'
    },
    {
      date: '2023-10-02',
      heartRateRange: '72-92',
      maxHrExceed: true,
      pace: '5.30',
      avgHeartRate: 85,
      summary: 'Same pace, but increased heart rate.',
      feedback: 'Your heart rate is rising at the same pace, which could be a sign of fatigue. Ensure you’re recovering properly and managing stress.'
    },
    {
      date: '2023-10-03',
      heartRateRange: '68-88',
      maxHrExceed: false,
      pace: '5.10',
      avgHeartRate: 78,
      summary: 'Same pace, but decreased heart rate.',
      feedback: 'Great job! You’re becoming more efficient, and your cardiovascular system is adapting well to the workload.'
    },
    {
      date: '2023-10-04',
      heartRateRange: '75-95',
      maxHrExceed: true,
      pace: '4.50',
      avgHeartRate: 90,
      summary: 'Improved pace, but increased heart rate.',
      feedback: 'Your speed is increasing, but so is your effort level. Make sure you’re not pushing too hard and monitor for overtraining.'
    },
    {
      date: '2023-10-05',
      heartRateRange: '70-85',
      maxHrExceed: false,
      pace: '5.20',
      avgHeartRate: 82,
      summary: 'Same pace, same heart rate.',
      feedback: 'You’re consistent. Continue with your routine, but consider adding intensity or distance for further improvement.'
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
        title: { text: "Time (seconds)" }
      },
      yaxis: {
        title: { text: "Heart Rate (BPM)" },
        min: 50,
        max: 100
      },
      stroke: { curve: 'smooth' },
      colors: ["#FF4560", "#775DD0", "#00E396", "#FEB019", "#008FFB"], // Customize colors
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 300 },
            legend: { position: 'bottom' }
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
