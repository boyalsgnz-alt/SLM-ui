export interface User {
  _id: string;
  name: string;
  age: number;
}

export interface LoginDto {
  email: string;
  password: string;
}
