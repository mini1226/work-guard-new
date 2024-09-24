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
  }


  onBackClick() {
    window.history.back();
  }

  reset(){
    this.athleteForm.reset();
  }


  onSubmit(): void {

  }

}
