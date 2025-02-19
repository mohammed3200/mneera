declare type SidebarItem = {
  key: string;
  name: string;
  page: undefined;
  icon: React.FC;
  isActive: boolean;
};

declare type SidebarItems = SidebarItem[];

declare type Columns = {
  key: string;
  label: string;
};

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
};

declare type DataBrigades = {
  id: string;
  name: string;
  WeaponType: string;
  Mechanisms: string;
  JoiningDate: number;
  HerPlace:string;
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
