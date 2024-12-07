import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Database, endAt, onValue, orderByChild, query, ref, set, startAt} from "@angular/fire/database";
import {LineChartOptions} from "../live-heart-rate/live-heart-rate.component";

@Component({
  selector: 'app-view-heart-rate',
  standalone: true,
  imports: [
    NgApexchartsModule,
    NgIf
  ],
  templateUrl: './view-heart-rate.component.html',
  styleUrl: './view-heart-rate.component.scss'
})
export class ViewHeartRateComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private af: Database) {
    console.log(this.data);
    let device: any = this.data.device;
    this.device = device;
    let startTime: any = this.data.startTime;
    let endTime: any = this.data.endTime;
    this.athleteHR = this.data.athleteHR;

    console.log(startTime);
    startTime = startTime.split(' ')[1];
    this.getData(device, startTime, endTime);
  }
  @ViewChild("chart") chart!: ChartComponent;
  public lineChartOptions: Partial<LineChartOptions> | any = {};
  device: string ='';
  athleteHR: any;
  private heartRateValues: any[] = [];
  private timeInSeconds: any[] = [];
  private maxRate: any[] = [];
  private minRate: any[] = [];

  ngOnInit(): void {
    this.initializeHeartRateData()

  }

  setAlarm() {
    console.log('Buzzer Fire');
    this.setBuzzer(1);
    setTimeout(()=>{
      this.setBuzzer(0)
      console.log('Buzzer Reset');
    },5000)
  }

  setBuzzer(value:number){
    let reference = ref(this.af, this.device + '/Buzzer');
    set(reference, value)
  }

  getData(device: string, startTime: string, endTime: string) {
    let databaseReference = ref(this.af, device + '/BPM');
    let res = query(databaseReference, orderByChild('Time'), startAt(startTime), endAt(endTime));
    onValue(res, snapshot => {
      console.log(snapshot.val());
      if (snapshot.val() != null) {
        let values: number[] = Object.values(snapshot.val());
        let numbers = values.slice(-60);
        this.heartRateValues = numbers.map((res: any) => {
          return res.BPM_VALUE
        });
        console.log(this.heartRateValues);
        this.maxRate=[];
        this.minRate=[];
        this.maxRate.push(...Array.from({ length: this.heartRateValues.length }, () => this.athleteHR.split('-')[1]));
        this.minRate.push(...Array.from({ length: this.heartRateValues.length }, () => this.athleteHR.split('-')[0]));
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
          name: "Max Rate",
          type: "line",
          data: this.maxRate,
        },
        {
          name: "Min Rate",
          type: "line",
          data: this.minRate,
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
