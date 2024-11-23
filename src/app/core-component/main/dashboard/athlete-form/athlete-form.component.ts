import {Component} from '@angular/core';
import {routes} from "../../../../core/helpers/routes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Athlete, AthleteLevel, Gender} from 'src/app/core/models/models';
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {DatePipe} from "@angular/common";
import {SweetalertService} from "../../../../shared/sweetalert/sweetalert.service";

@Component({
  selector: 'app-athlete-form',
  templateUrl: './athlete-form.component.html',
  styleUrl: './athlete-form.component.scss'
})
export class AthleteFormComponent {
  public routes = routes;
  isEditId: any;
  genderData: string[] = [];
  levelData: string[] = [];
  heartRateData = ['120-150', '150-165', '165-175', '175-185', '185-200', 'Other'];

  athleteForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    events: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl({value: '', disabled: true}, [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    height: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    hrRate: new FormControl('', [Validators.required]),
    cusHrRate: new FormControl(''),
    personalBest: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute,
              private athleteService: AthleteService,
              private router: Router,
              private datePipe: DatePipe,
              private alertservice: SweetalertService) {
    this.levelData = Object.values(AthleteLevel);
    this.genderData = Object.values(Gender);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
      if (this.isEditId) {
        this.loadAthleteDetails();
      }
    });

    this.athleteForm.get('dob')?.valueChanges.subscribe((dobValue) => {
      if (dobValue) {
        const age = this.calculateAge(dobValue);
        this.athleteForm.get('age')?.setValue(age);
      }
    });
  }


  onBackClick() {
    window.history.back();
  }

  reset() {
    this.athleteForm.reset();
  }


  onSubmit(): void {
    console.log(this.athleteForm.value);
    if (this.athleteForm.valid) {
      let obj: Athlete = {
        firstName: this.athleteForm.get('firstName')?.value,
        lastName: this.athleteForm.get('lastName')?.value,
        email: this.athleteForm.get('email')?.value,
        event: this.athleteForm.get('events')?.value,
        contact: this.athleteForm.get('contact')?.value,
        level: this.athleteForm.get('level')?.value,
        gender: this.athleteForm.get('gender')?.value,
        weight: this.athleteForm.get('weight')?.value,
        height: this.athleteForm.get('height')?.value,
        personalBest: this.athleteForm.get('personalBest')?.value,
        heartRate: this.athleteForm.get('hrRate')?.value == 'Other' ? this.athleteForm.get('cusHrRate')?.value : this.athleteForm.get('hrRate')?.value,
        dob: this.datePipe.transform(this.athleteForm.get('dob')?.value, 'yyyy-MM-dd'),
        createdBy: localStorage.getItem('userEmail')
      }
      if (this.isEditId) {
        obj = {...obj, id: this.isEditId}
        this.athleteService.updateAthlete(obj).subscribe(value => {
          console.log(value);
          this.alertservice.saveBtn();
          this.router.navigate([routes.athletes]);
        }, error => {
          console.log(error);
        })
      } else {
        this.athleteService.saveAthlete(obj).subscribe(value => {
          this.alertservice.saveBtn();
          this.router.navigate([routes.athletes]);
        }, error => {
          console.log(error);
        })
      }
    }
  }

  calculateAge(dob: string | Date): number {
    const dobDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    // If birthdate hasn't occurred yet this year, subtract one from the age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  }

  private loadAthleteDetails() {
    this.athleteService.getAthleteDetail(this.isEditId).subscribe(value => {
      console.log(value);
      this.athleteForm.setValue({
        firstName: value.first_name,
        lastName: value.last_name,
        weight: value.weight,
        events: value.event,
        dob: value.dob,
        gender: value.gender,
        age: this.calculateAge(value.dob),
        contact: value.contact,
        email: value.email,
        height: value.height,
        level: value.level,
        hrRate: this.heartRateData.filter(value1 => value1===value.heart_rate).length>0 ? value.heart_rate: 'Other',
        cusHrRate: this.heartRateData.filter(value1 => value1===value.heart_rate).length===0 ? value.heart_rate: '',
        personalBest: value.personal_best,
      })
    })
  }
}
