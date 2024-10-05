import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {routes} from "../../../../core/helpers/routes";
import {SweetalertService} from "../../../../shared/sweetalert/sweetalert.service";

@Component({
  selector: 'app-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrl: './competition-form.component.scss'
})
export class CompetitionFormComponent {
  public routes = routes;
  isEditId: any;


  sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      device: "D001",
      gender: "Male",
      weight: 75,
      height: 180,
      action: "Edit"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      device: "D002",
      gender: "Female",
      weight: 65,
      height: 165,
      action: "Edit"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      device: "D003",
      gender: "Male",
      weight: 82,
      height: 175,
      action: "Edit"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      device: "D004",
      gender: "Female",
      weight: 58,
      height: 160,
      action: "Edit"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      device: "D005",
      gender: "Male",
      weight: 90,
      height: 185,
      action: "Edit"
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      device: "D006",
      gender: "Female",
      weight: 70,
      height: 170,
      action: "Edit"
    },
    {
      id: 7,
      name: "James Lee",
      email: "james.lee@example.com",
      device: "D007",
      gender: "Male",
      weight: 68,
      height: 172,
      action: "Edit"
    },
    {
      id: 8,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      device: "D008",
      gender: "Female",
      weight: 60,
      height: 162,
      action: "Edit"
    },
    {
      id: 9,
      name: "Daniel White",
      email: "daniel.white@example.com",
      device: "D009",
      gender: "Male",
      weight: 85,
      height: 178,
      action: "Edit"
    },
    {
      id: 10,
      name: "Isabella Garcia",
      email: "isabella.garcia@example.com",
      device: "D0010",
      gender: "Female",
      weight: 55,
      height: 158,
      action: "Edit"
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
      'id': 3,
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
      'id': 6,
      'name': 'Other'
    }
  ];

  athleteForm: FormGroup = new FormGroup({
    competitionName: new FormControl(''),
    date: new FormControl(''),
    weight: new FormControl(''),
    contactNumber: new FormControl(''),
    dob: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    height: new FormControl(''),
    athleteArray: new FormArray([]),
  });

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isEditId = params['id'];
    });
  }

  get athleteArray(): FormArray {
    return this.athleteForm.get('athleteArray') as FormArray;
  }

  addAthleteArray() {
    let formGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      level: new FormControl(''),
      hr: new FormControl(''),
      cusHr: new FormControl(''),
      device: new FormControl(''),
    });

    formGroup.get('name')?.valueChanges.subscribe(selectedAthleteId => {
      // Convert selectedAthleteId to a number before comparison
      const athleteId = Number(selectedAthleteId);
      const selectedAthlete = this.sampleData.find(athlete => athlete.id === athleteId);
      if (selectedAthlete) {
        // Convert id to a string when setting the form control value
        formGroup.get('id')?.setValue(selectedAthlete.id.toString());
        formGroup.get('device')?.setValue(selectedAthlete.device);
      }
    });

    this.athleteArray.push(formGroup);
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

  removeAthleteFormArray(index: number): void {
    this.athleteArray.removeAt(index);
  }


}
