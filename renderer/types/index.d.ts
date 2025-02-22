declare type Columns = {
  key: string;
  label: string;
};

declare type Branch = {
  title: string;
  route: string;
};

export enum blood {
  "+O" = "+O",
  "-O" = "-O",
  "+A" = "+A",
  "-A" = "-A",
  "+B" = "+B",
  "-B" = "-B",
  "+AB" = "+AB",
  "-AB" = "-AB",
}

declare type DataMembers = {
  id: string;
  name: string;
  Attribute: string;
  Age: number;
  BloodType: string;
  CivilOrMilitary: boolean;
  NationalNumber: string;
  Workplace: string;
  AcademicQualification: string;
};

declare type DataIndividuals = {
  id: string;
  name: string;
  WeaponType: string;
  BloodType: string;
  Age: number;
  NationalNumber: string;
  PhoneNumber: string;
  Workplace: string;
  BrigadesId: string;
};

declare type DataBrigades = {
  id: string;
  name: string;
  WeaponType: string;
  Mechanisms: string;
  JoiningDate: number;
  HerPlace: string;
  BattalionCommander: string;
};

declare type DataCourses = {
  id: string;
  NameCourse: string;
  StartDate: string;
  EndDate: string;
  StudentsName: string[];
  TeacherName: string;
};

declare type DataWounded = {
  id: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  bloodType: blood;
  typeOfInjury: string;
  injuryLocation: string;
  injuryDescription: string;
  dateOfInjury: Date;
};

declare type DateMartyr = {
  id: string;
  name: string;
  dateOfMartyrdom: Date;
  locationOfMartyrdom: Date;
}