// Defineing interface for a single product

export interface ISizes {
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
}

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPrice: number;
  gender: string;
  image: string;
  name: string;
  price: number;
  sale: boolean;
  size: ISizes;
  stock: number;
  _id: string;
}

export interface ICartProduct extends IProduct {
  cartQuantity: ISizes
}

export interface IDecodedUserInfo {
  roles: string,
  userId: string,
  username: string,
}

export interface IDecoded {
  UserInfo: IDecodedUserInfo,
  iat: string,
  exp: string,
}

//Order Interface
export interface IOrder {
  _id?: string
  orderDate?: Date;
  deliveryAddress?: string;
  sum?: number;
  status?: string;
  userRef?: string;
  orderNumber?: number;
  createdAt?: string,
  updatedAt?: string,
}