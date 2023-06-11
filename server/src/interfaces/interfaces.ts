import { ObjectId } from "mongoose";

export interface IStatusError extends Error {
  status?: number;
}

// Products quantity in stock for different sizes
export interface IProductSizes { 
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
}

//Product Interface
export interface IProduct {
  brand: string;
  cartQuantity?: IProductSizes;
  category: string;
  description: string;
  discountPrice: number | null;
  gender: string;
  image: string;
  name: string;
  price: number;
  sale: boolean;
  size: IProductSizes[];
  stock: number;

}

//User Interface
export interface IUser {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  roles: string;
  verified: boolean;
}

//Order Interface
export interface IOrder {
  orderDate: Date;
  deliveryAddress: string;
  sum: number;
  status: string;
  userRef: string;
  orderNumber: number;
}

//e-mail verify Token Interface
export interface IVerifyToken {
	userId: ObjectId;
	token: string;
	createdAt: Date;
  type?:string;
}

export interface IDecodedUserInfo {
  roles: string,
  userId: string,
  username: string,
}

export interface IDecoded {
  UserInfo: IDecodedUserInfo,
  iat?: string,
  exp?: string,
}
