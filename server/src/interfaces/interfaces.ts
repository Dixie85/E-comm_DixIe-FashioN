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
  cartQuantity?: number;
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
  username: string;
  email: string;
  password: string;
  roles: string;
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


