import {Component} from '@angular/core';
import {routes} from "../../../../core/helpers/routes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Athlete, AthleteLevel, Gender} from 'src/app/core/models/models';
import {AthleteService} from "../../../../core/service/athlete/athlete.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-athlete-form',
  templateUrl: './athlete-form.component.html',
  styleUrl: './athlete-form.component.scss'
})
export class AthleteFormComponent {
  public routes = routes;
  isEditId: any;
  customHrRate: string | null = null;
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

  constructor(private route: ActivatedRoute, private athleteService: AthleteService, private datePipe: DatePipe) {
    this.levelData = Object.values(AthleteLevel);
    this.genderData = Object.values(Gender);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
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
      const obj: Athlete = {
        ...this.athleteForm.value,
        dob: this.datePipe.transform(this.athleteForm.get('dob')?.value, 'yyyy-MM-dd'),
        createdBy: localStorage.getItem('userId')
      }
      this.athleteService.saveAthlete(obj).subscribe(value => {
        console.log(value);
      }, error => {
        console.log(error);
      })
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

}
