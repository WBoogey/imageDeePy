export interface userType {
  id: number;
  username: string;
  email: string;
}

export interface registerType {
  username: string,
  email : string,
  password: string 
}

export interface LoginType {
  email: string ,
  password: string
}

export interface registerResponseType {
  jwt: string;
  user: userType;
}

export interface loginResponseType {
  jwt: string;
  user: userType;
}