import { IProduct, IProductSizes } from "../interfaces/interfaces";
import { Schema, model, Document } from "mongoose";

interface IProductModel extends IProduct, Document {}

const productSizesSchema = new Schema<IProductSizes>(
  {
    xs: Number,
    s: Number,
    m: Number,
    l: Number,
    xl: Number,
  }
)

const productSchema = new Schema<IProductModel>(
  {
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    size: productSizesSchema,
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
);

export const Product = model<IProductModel>("product", productSchema);
