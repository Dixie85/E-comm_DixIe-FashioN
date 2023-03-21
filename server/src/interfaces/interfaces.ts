export interface IStatusError extends Error {
  status?: number;
}

//User Interface
export interface IUser {
  username: string;
  email: string;
  password: string;
  roles: string;
}
