export interface IStatusError extends Error {
  status?: number;
}

//User Interface
export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  roles: string;
}
