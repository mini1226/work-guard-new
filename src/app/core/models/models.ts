export interface pageSelection {
  skip: number;
  limit: number;
}

export interface apiResultFormat {
  data: [];
  totalData: number;
}

export interface Athlete {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  event: string;
  contact: string;
  dob: any;
  level: AthleteLevel;
  heartRate: string;
  gender: Gender;
  weight: number;
  height: number;
  personalBest: string;
  createdBy: any;
}

export enum Gender {
  MALE = "MALE",FEMALE = "FEMALE",OTHER = "OTHER"
}

export enum AthleteLevel {
  GENERALPREPARATION = "GENERAL PREPARATION", SPECIALPREPARATION = "SPECIAL PREPARATION", PRECOMPETITION = "PRE COMPETITION", COMPETITION = "COMPETITION"
}
