export interface pageSelection {
  skip: number;
  limit: number;
}

export interface apiResultFormat {
  data: [];
  totalData: number;
}

export interface Athlete {
  firstName: string;
  lastName: string;
  email: string;
  event: string;
  contact: string;
  dob: string;
  level: AthleteLevel; // assuming different levels
  heartRate: string;
  gender: Gender;
  weight: number;
  height: number;
  personalBest: string;
  createdBy: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female"
}

export enum AthleteLevel {
  General_Preparation = "General Preparation",
  Special_Preparation = "Special Preparation",
  Pre_Competition = "Pre Competition",
  Competition = "Competition"
}
