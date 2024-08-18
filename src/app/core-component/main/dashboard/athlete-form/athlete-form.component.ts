import { Component } from '@angular/core';
import {routes} from "../../../../core/helpers/routes";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-athlete-form',
  templateUrl: './athlete-form.component.html',
  styleUrl: './athlete-form.component.scss'
})
export class AthleteFormComponent {
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


  levelData = [
    {
      'id': 1,
      'name': 'Beginner'
    },{
      'id': 2,
      'name': 'Intermediate'
    },{
      'id': 3,
      'name': 'Expert'
    }
  ];


  hrData = [
    {
      'id': 1,
      'name': '70-80'
    },{
      'id': 2,
      'name': '80-90'
    },{
      'id': 3,
      'name': '90-100'
    },{
      'id': 4,
      'name': '100-120'
    }
  ];

  athleteForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    weight: new FormControl(''),
    contactNumber: new FormControl(''),
    dob: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    height: new FormControl(''),
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
    console.log('Form Submitted',this.athleteForm.value);
  }
}
