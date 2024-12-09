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
      const x = JSON.parse(params['data']);
      console.log(x);
      x.forEach((res: any, index: number) => {
        let sum = '';
        let feed = '';
        if (index == 0) {
          sum = 'Initial Pace and heart rate';
          feed = 'Maintain your pace and stay efficient'
        } else {
          const paceBefore = Number(x[index - 1].pace ? x[index - 1].pace : 0);
          const hrBefore = Number(x[index - 1].heart_rate_detail ? x[index - 1].heart_rate_detail:0);
          const paceNow = Number(res.pace ? res.pace:0);
          const hrNow = Number(res.heart_rate_detail ? res.heart_rate_detail:0);

          console.log('paceBefore : ',paceBefore , ' paceNow : ', paceNow);
          console.log('hrBefore : ',hrBefore , ' hrNow : ', hrNow);

          if (paceBefore == paceNow && hrBefore == hrNow) {
            sum='1';
            feed='1'
          }

          if (paceBefore == paceNow && hrBefore < hrNow) {
            sum='Same pace, but increased heart rate.';
            feed='Your heart rate is rising at the same pace, which could be a sign of fatigue. Ensure you\'re recovering properly and managing stress.'
          }

          if (paceBefore == paceNow && hrBefore != hrNow) {
            sum='Same pace, but decreased heart rate';
            feed='Great job! You’re becoming more efficient and your cardiovascular system is adapting well to the workload.'
          }

          if (paceBefore < paceNow && hrBefore == hrNow) {
            sum="Improved pace, same heart rate.";
            feed="Excellent improvement! You're running faster while keeping your heart rate steady, showing progress in fitness and endurance."
          }

          if (paceBefore < paceNow && hrBefore < hrNow) {
            sum="Improved pace, but increased heart rate.";
            feed="Your speed is increasing, but so is your effort level. Make sure you're not pushing too hard and monitor for over training."
          }

          if (paceBefore < paceNow && hrBefore > hrNow) {
            sum="Improved pace, but decreased heart rate.";
            feed="Fantastic! You're running faster while exerting less effort—clear signs of improved fitness and endurance."
          }

          if (paceBefore > paceNow && hrBefore == hrNow) {
            sum="Slower pace, same heart rate.";
            feed="Your pace is decreasing without a change in heart rate. Consider reviewing your training and recovery routine, as this could indicate fatigue."
          }

          if (paceBefore > paceNow && hrBefore < hrNow) {
            sum="Slower pace, but increased heart rate.";
            feed="Your heart rate is higher while your pace is slower. This may be a sign of over training or lack of recovery. Consider taking a rest day or focusing on recovery."
          }

          if (paceBefore > paceNow && hrBefore > hrNow) {
            sum="Slower pace, but decreased heart rate.";
            feed="Your body might be recovering. Use this time to focus on form and light recovery training."
          }

          if(hrNow> 150){
            sum="Heart rate exceeded target zone.";
            feed="Your heart rate is higher than the optimal training range. This could indicate overexertion; consider lowering your intensity or incorporating more recovery."
          }

          if(paceNow> 10){
            sum="Heart rate significantly below resting level.";
            feed="Your heart rate is unusually low. This might indicate fatigue or overtraining. Monitor your overall health and consider consulting a coach or trainer."
          }

        }
        const y = {
          ...res,
          summary: sum,
          feedback: feed
        }
        this.heartRateTableData.push(y)
      })
      for (let i = 0; i < this.heartRateTableData.length; i++) {
        let lastFiveElement = this.heartRateTableData[i];
        let transform: any = this.datePipe.transform(lastFiveElement.start_time, 'YYYY-MM-dd HH:mm:ss');
        this.commonService.individualRaceEndTime(transform, lastFiveElement.duration).then((endTime: string) => {
          console.log(transform);
          console.log(endTime);
          this.getData('D001', transform, endTime)
        });
      }
    });
  }

  getData(device: string, startTime: string, endTime: string) {
    let databaseReference = ref(this.af, device + '/BPM');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(res, snapshot => {
      console.log(snapshot.val());
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

  onBackClick() {
    window.history.back();
  }
}
