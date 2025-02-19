export const MockDataMembers: DataMembers[] = [
  {
    id: '1',
    name: 'John Doe',
    Attribute: 'Sample Attribute',
    Age: 30,
    BloodType: 'O+',
    CivilOrMilitary: true,
    NationalNumber: '123456789',
    Workplace: 'Sample Company',
    AcademicQualification: "Bachelor's Degree"
  },
  {
    id: '2',
    name: 'Jane Smith',
    Attribute: 'Another Attribute',
    Age: 28,
    BloodType: 'A-',
    CivilOrMilitary: false,
    NationalNumber: '987654321',
    Workplace: 'Another Company',
    AcademicQualification: "Master's Degree"
  },
  {
    id: '3',
    name: 'Alice Johnson',
    Attribute: 'Third Attribute',
    Age: 35,
    BloodType: 'B+',
    CivilOrMilitary: true,
    NationalNumber: '456789123',
    Workplace: 'Tech Corp',
    AcademicQualification: 'PhD'
  },
  {
    id: '4',
    name: 'Bob Brown',
    Attribute: 'Fourth Attribute',
    Age: 40,
    BloodType: 'AB-',
    CivilOrMilitary: false,
    NationalNumber: '321654987',
    Workplace: 'Finance Inc.',
    AcademicQualification: "Associate's Degree"
  },
  {
    id: '5',
    name: 'Charlie Davis',
    Attribute: 'Fifth Attribute',
    Age: 22,
    BloodType: 'O-',
    CivilOrMilitary: false,
    NationalNumber: '654321789',
    Workplace: 'Startup LLC',
    AcademicQualification: 'High School Diploma'
  }
]

export const MockDataIndividuals: DataIndividuals[] = [
  {
    id: '1',
    name: 'حواء آدمز',
    WeaponType: 'سيف',
    BloodType: 'O+',
    Age: 29,
    NationalNumber: '111222333',
    PhoneNumber: '555-1234',
    Workplace: 'نقابة المحاربين',
    BrigadesId: '1'
  },
  {
    id: '2',
    name: 'فرانك وايت',
    WeaponType: 'قوس',
    BloodType: 'A-',
    Age: 34,
    NationalNumber: '444555666',
    PhoneNumber: '555-5678',
    Workplace: 'أكاديمية الرماة',
    BrigadesId: '2'
  },
  {
    id: '3',
    name: 'غريس غرين',
    WeaponType: 'عصا',
    BloodType: 'B+',
    Age: 27,
    NationalNumber: '777888999',
    PhoneNumber: '555-8765',
    Workplace: 'برج السحرة',
    BrigadesId: '3'
  },
  {
    id: '4',
    name: 'هانك بلاك',
    WeaponType: 'فأس',
    BloodType: 'AB-',
    Age: 45,
    NationalNumber: '222333444',
    PhoneNumber: '555-4321',
    Workplace: 'عشيرة البرسرك',
    BrigadesId: '4'
  },
  {
    id: '5',
    name: 'آيفي بلو',
    WeaponType: 'خنجر',
    BloodType: 'O-',
    Age: 19,
    NationalNumber: '888999000',
    PhoneNumber: '555-6789',
    Workplace: 'نقابة اللصوص',
    BrigadesId: '5'
  }
]

export const MockDataBrigades: DataBrigades[] = [
  {
    id: '1',
    name: 'Alpha Brigade',
    WeaponType: 'Rifle',
    Mechanisms: 'Standard',
    JoiningDate: 2023,
    HerPlace: 'Base Camp Alpha',
    BattalionCommander: 'Bob Job'
  },
  {
    id: '2',
    name: 'Bravo Brigade',
    WeaponType: 'Pistol',
    Mechanisms: 'Advanced',
    JoiningDate: 2022,
    HerPlace: 'Base Camp Bravo',
    BattalionCommander: 'احمد محمد'
  },
  {
    id: '3',
    name: 'Charlie Brigade',
    WeaponType: 'Crossbow',
    Mechanisms: 'Stealth',
    JoiningDate: 2021,
    HerPlace: 'Base Camp Charlie',
    BattalionCommander: 'علي محمد'
  },
  {
    id: '4',
    name: 'Delta Brigade',
    WeaponType: 'Shotgun',
    Mechanisms: 'Close Combat',
    JoiningDate: 2020,
    HerPlace: 'Base Camp Delta',
    BattalionCommander: 'خالد احمد'
  },
  {
    id: '5',
    name: 'Echo Brigade',
    WeaponType: 'Sniper Rifle',
    Mechanisms: 'Long Range',
    JoiningDate: 2019,
    HerPlace: 'Base Camp Echo',
    BattalionCommander: 'سعيد علي'
  },
  {
    id: '6',
    name: 'Foxtrot Brigade',
    WeaponType: 'Grenade Launcher',
    Mechanisms: 'Explosive',
    JoiningDate: 2021,
    HerPlace: 'Base Camp Foxtrot',
    BattalionCommander: 'محمد خالد'
  },
  {
    id: '7',
    name: 'Golf Brigade',
    WeaponType: 'Sword',
    Mechanisms: 'Melee',
    JoiningDate: 2022,
    HerPlace: 'Base Camp Golf',
    BattalionCommander: 'عمر سعيد'
  },
  {
    id: '8',
    name: 'Hotel Brigade',
    WeaponType: 'Axe',
    Mechanisms: 'Heavy',
    JoiningDate: 2023,
    HerPlace: 'Base Camp Hotel',
    BattalionCommander: 'يوسف علي'
  }
]

export const MockDataCourse: DataCourses[] = [
  {
    id: '1',
    NameCourse: 'Introduction to Programming',
    StartDate: '2023-01-15',
    EndDate: '2023-05-15',
    StudentsName: ['John Doe', 'Jane Smith', 'Alice Johnson'],
    TeacherName: 'Dr. Emily Carter'
  },
  {
    id: '2',
    NameCourse: 'Advanced Mathematics',
    StartDate: '2023-02-01',
    EndDate: '2023-06-01',
    StudentsName: ['Bob Brown', 'Charlie Davis'],
    TeacherName: 'Prof. Michael Johnson'
  },
  {
    id: '3',
    NameCourse: 'History of Art',
    StartDate: '2023-03-10',
    EndDate: '2023-07-10',
    StudentsName: ['Eve Adams', 'Frank White', 'Grace Green'],
    TeacherName: 'Ms. Sarah Lee'
  },
  {
    id: '4',
    NameCourse: 'Data Science Fundamentals',
    StartDate: '2023-04-20',
    EndDate: '2023-08-20',
    StudentsName: ['Hank Black', 'Ivy Blue'],
    TeacherName: 'Dr. Robert Brown'
  },
  {
    id: '5',
    NameCourse: 'Web Development Basics',
    StartDate: '2023-05-01',
    EndDate: '2023-09-01',
    StudentsName: ['Alice Johnson', 'Charlie Davis', 'Eve Adams'],
    TeacherName: 'Mr. Alan Turing'
  },
  {
    id: '6',
    NameCourse: 'Machine Learning 101',
    StartDate: '2023-06-15',
    EndDate: '2023-10-15',
    StudentsName: ['John Doe', 'Jane Smith', 'Grace Green'],
    TeacherName: 'Dr. Ada Lovelace'
  },
  {
    id: '7',
    NameCourse: 'Cybersecurity Essentials',
    StartDate: '2023-07-01',
    EndDate: '2023-11-01',
    StudentsName: ['Bob Brown', 'Hank Black'],
    TeacherName: 'Prof. Alan Turing'
  },
  {
    id: '8',
    NameCourse: 'Digital Marketing Strategies',
    StartDate: '2023-08-10',
    EndDate: '2023-12-10',
    StudentsName: ['Ivy Blue', 'Frank White'],
    TeacherName: 'Ms. Sarah Lee'
  }
]
