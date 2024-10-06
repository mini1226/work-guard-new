import { Component } from '@angular/core';
import {routes} from "../../../../core/helpers/routes";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {moment} from "ngx-bootstrap/chronos/testing/chain";

@Component({
  selector: 'app-athlete-form',
  templateUrl: './athlete-form.component.html',
  styleUrl: './athlete-form.component.scss'
})
export class AthleteFormComponent {
  public routes = routes;
  isEditId: any;
  customHrRate: string | null = null;


  genderData = [
    {
      'id': 1,
      'name': 'Male'
    },{
      'id': 2,
      'name': 'Female'
    }
  ];


  levelData = [
    {
      'id': 1,
      'name': 'General Preparation'
    },{
      'id': 2,
      'name': 'Special Preparation'
    },{
      'id': 3,
      'name': 'Pre Competition'
    },{
      'id': 4,
      'name': 'Competition'
    }
  ];


  hrData = [
    {
      'id': 1,
      'name': '120-150'
    },{
      'id': 2,
      'name': '150-165'
    },{
      'id': 3,
      'name': '165-175'
    },{
      'id': 4,
      'name': '175-185'
    },{
      'id': 5,
      'name': '185-200'
    },{
      'id': 5,
      'name': 'Other'
    }
  ];

  athleteForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    weight: new FormControl(''),
    contactNumber: new FormControl(''),
    dob: new FormControl(''),
    age: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    height: new FormControl(''),
    level: new FormControl(''),
    hrRate: new FormControl(''),
    cusHrRate: new FormControl(''),
    personalBest: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) { }

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

  reset(){
    this.athleteForm.reset();
  }


  onSubmit(): void {
    const selectedHrRate = this.athleteForm.get('hrRate')?.value;

    if (selectedHrRate === null && this.customHrRate) {
      // Handle custom heart rate input here
      console.log('Custom Heart Rate:', this.customHrRate);
    } else {
      // Handle predefined heart rate option
      console.log('Selected Heart Rate:', selectedHrRate);
    }
    console.log('Form Submitted',this.athleteForm.value);
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
