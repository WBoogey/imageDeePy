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
    token: string;
  }

export interface loginResponseType {
    token: string;
  }