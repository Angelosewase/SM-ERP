export interface schoolIBase {
  _id: string;
  name: string;
  address: string;
  email: string;
  admin: string[];
  teachers?: string[];
  students?: string[];
  classes?: string[];
  parents?: string[];
  establishedYear?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserIBase {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  school?: string;
  role: "admin" | "teacher";
  teacher?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudent {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  schoolId?: string;
  classId: string;
  parents?: string[];
  gender: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITeacher {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  schoolId?: string;
  subjects: string[];
  classes: string[];
  createdAt?: string;
  updatedAt?: string;
  gender?: string;
}

export interface IClass {
  _id?: string;
  name: string;
  students?: string[];
  subjects?: string[];
  schoolId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IParent {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  child: string;
  gender: string;
  schoolId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeacher {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  schoolId?: string;
  subjects: string[];
  classes: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubject {
  _id?: string;
  name: string;
  teacherId: string;
  classes: string[];
  days: string[];
  schoolId?: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface IExpenseRecord {
  _id: string;
  name: string;
  schoolId: string;
  amount: number;
  paymentDate: Date;
  transactionType: string;
  status: "paid" | "pending" | "overdue";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFeeGroup {
  _id?: string; 
  name: string;
  description?: string; 
  schoolId: string;
  createdAt?: Date | string; 
  updatedAt?: Date | string ;
}


export interface IFee {
  _id?: string; 
  schoolId: string;
  classId?: string; 
  feeType: string;
  amount: number;
  dueDate: Date;
  createdAt?: Date | string ; 
  updatedAt?: Date | string ;
}
