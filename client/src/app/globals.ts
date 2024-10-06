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