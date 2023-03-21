// Defineing interface for a single product

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
    size: string[];
    stock: number;
    _id: number;
  }

export interface ICartProduct extends IProduct {
    selectedSize?: string;
    cartQuantity: number

  }