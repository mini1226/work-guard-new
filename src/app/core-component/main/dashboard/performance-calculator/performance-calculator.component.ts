import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";

@Component({
  selector: 'app-performance-calculator',
  templateUrl: './performance-calculator.component.html',
  styleUrl: './performance-calculator.component.scss'
})
export class PerformanceCalculatorComponent {
  public routes = routes;
  isEditId: any;

  genderData = [
    {
      'id': 1,
      'name': 'Male'
    },{
      'id': 2,
      'name': 'Female'
    }
  ];

  athleteForm: FormGroup = new FormGroup({
    age: new FormControl(''),
    gender: new FormControl(''),
    weight: new FormControl(''),
    height: new FormControl(''),
    bmi: new FormControl(''),
    time: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });

    // Subscribe to weight and height value changes
    this.athleteForm.get('weight')?.valueChanges.subscribe(() => {
      this.calculateBMI();
    });

    this.athleteForm.get('height')?.valueChanges.subscribe(() => {
      this.calculateBMI();
    });
  }


  onBackClick() {
    window.history.back();
  }

  reset(){
    this.athleteForm.reset();
  }


  onSubmit(): void {

  }

  calculateBMI() {
    const weight = this.athleteForm.get('weight')?.value;
    const height = this.athleteForm.get('height')?.value;

    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI and round to 2 decimal places
      this.athleteForm.get('bmi')?.setValue(bmi);
    }
  }

}
