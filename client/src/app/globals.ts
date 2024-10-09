export interface schoolIBase {
  _id: string;
  name: string;
  address: string;
  email: string;
  admin: string[];
  teachers?: string[];
  students?: string[];
  classes?: string[];
  establishedYear?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserIBase {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  school?: string;
  role: "admin" | "teacher";
  teacher?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudent {
  id?: string; 
  firstName: string;
  lastName: string;
  email?: string; 
  schoolId: string; 
  classId: string; 
  parents?: string[]; 
  gender: "male" | "female"; 
  createdAt?: string; 
  updatedAt?: string;
}

export interface ITeacher {
  id?: string; 
  firstName: string;
  lastName: string;
  email: string; 
  schoolId?: string; 
  subjects: string[]; 
  classes: string[]; 
  createdAt?: string; 
  updatedAt?: string; 
}

export interface IClass {
  id?: string; 
  name: string; 
  students?: string[]; 
  subjects?: string[]; 
  schoolId: string; 
  createdAt?: string; 
  updatedAt?: string; 
}
