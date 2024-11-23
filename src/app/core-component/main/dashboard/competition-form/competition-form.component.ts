import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {SweetalertService} from "../../../../shared/sweetalert/sweetalert.service";
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {SessionService} from "../../../../core/service/sessions/session.service";
import {Athlete} from "../../../../core/models/models";

@Component({
  selector: 'app-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrl: './competition-form.component.scss'
})
export class CompetitionFormComponent {
  public routes = routes;
  isEditId: any;


  sessionData = [
    {
      'id': 1,
      'name': 'Running'
    },{
      'id': 2,
      'name': 'Other'
    }
  ];


  athletesAll: Array<any> = [];


  athleteForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    sess_date: new FormControl(''),
    venue: new FormControl(''),
    athletes: new FormArray([]),
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private athleteService: AthleteService,
              private alertservice: SweetalertService,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
    this.loadAllAthletes();
    if (this.isEditId){
      this.getSessionById();
    }
  }

  get athletes(): FormArray {
    return this.athleteForm.get('athletes') as FormArray;
  }

  addAthleteArray() {
    let formGroup = new FormGroup({
      id: new FormControl(''),
      level: new FormControl(''),
      hrRate: new FormControl(''),
      deviceId: new FormControl(''),
    });

    // Call updateAthleteDetails on name change
    formGroup.get('id')?.valueChanges.subscribe(selectedAthleteId => {
      this.updateAthleteDetails(formGroup, selectedAthleteId);
      console.log('Current Form Array Value:', this.athletes.value);
    });

    this.athletes.push(formGroup);
  }

// Updated function to handle string IDs for athlete lookup
  updateAthleteDetails(formGroup: FormGroup, selectedAthleteId: any) {
    const selectedAthlete = this.athletesAll.find(athlete => athlete.id === selectedAthleteId);
    if (selectedAthlete) {
      formGroup.get('level')?.setValue(selectedAthlete.level);
      formGroup.get('hrRate')?.setValue(selectedAthlete.heart_rate);
    } else {
      formGroup.get('level')?.setValue('');
      formGroup.get('hrRate')?.setValue('');
    }
  }





  onBackClick() {
    window.history.back();
  }

  reset(){
    this.athleteForm.reset();
  }


  onSubmit(): void {
    console.log('Form Submitted',this.athleteForm.value);
    if (this.athleteForm.valid) {
      if (this.isEditId) {
        const formData = {
          ...this.athleteForm.value,
          id: this.isEditId,
          sess_date: this.formatDate(this.athleteForm.value.sess_date),
          createdBy: localStorage.getItem('userEmail')
        };
        this.sessionService.updateSession(formData).subscribe(value => {
          this.alertservice.saveBtn();
          this.router.navigate([routes.competition]);
        }, error => {
        })
      } else {
        const formData = {
          ...this.athleteForm.value,
          sess_date: this.formatDate(this.athleteForm.value.sess_date),
          createdBy: localStorage.getItem('userEmail')
        };
        this.sessionService.saveSession(formData).subscribe(value => {
          this.alertservice.saveBtn();
          this.router.navigate([routes.competition]);
        }, error => {
          console.log(error);
        })
      }
    }
  }

  removeAthleteFormArray(index: number): void {
    this.athletes.removeAt(index);
  }


  private loadAllAthletes() {
    this.athleteService.getAthleteAll(localStorage.getItem('userId')).subscribe(value => {
      this.athletesAll=value;
      // this.sampleData
    })
  }

  private getSessionById() {
    this.sessionService.getSessionById(this.isEditId).subscribe(value => {
      console.log(value);
      this.athleteForm.patchValue({
        'name': value.name,
        'sess_date': value.session_date,
        'venue': value.venue,
      });

      value.session_details.forEach((item: any, index: number) => {
        let formGroup = new FormGroup({
          id: new FormControl(item.athlete_id),
          level: new FormControl(item.level),
          hrRate: new FormControl(item.heart_rate_detail),
          deviceId: new FormControl(item.device_id)
        });
        this.athletes.push(formGroup);
      });

    })
  }


  formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
