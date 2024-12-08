import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {SweetalertService} from "../../../../shared/sweetalert/sweetalert.service";
import {SessionService} from "../../../../core/service/sessions/session.service";

@Component({
  selector: 'app-performance-calculator',
  templateUrl: './performance-calculator.component.html',
  styleUrl: './performance-calculator.component.scss'
})
export class PerformanceCalculatorComponent {
  public routes = routes;
  isEditId: any;

  result: any;

  genderData = [
    {
      'id': 0,
      'name': 'Male'
    },{
      'id': 1,
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

  constructor(private route: ActivatedRoute,
              private alertservice: SweetalertService,
              private sessionService: SessionService) { }

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
    console.log(this.athleteForm.value);
    if (this.athleteForm.valid){
      this.sessionService.calculator(this.athleteForm.value).subscribe(
        value => {
          this.result = value?.result;
          if (value !== undefined) {
            console.log('Result:', value);
            this.alertservice.saveBtn(); // Call your save button logic
          } else {
            this.alertservice.errorPopup();
          }
        },
        error => {
          console.error('Error:', error); // Log error for debugging
        }
      );
    }
  }

  calculateBMI() {
    const weight = this.athleteForm.get('weight')?.value;
    const height = this.athleteForm.get('height')?.value;

    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2)); // Calculate BMI and convert to number
      this.athleteForm.get('bmi')?.setValue(bmi); // Set the BMI as a number
    }
  }


}
