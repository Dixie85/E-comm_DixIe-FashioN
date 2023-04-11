import { IOrder } from "../interfaces/interfaces";
import { Schema, model, Document } from "mongoose";

interface IOrderModel extends IOrder, Document {}

const orderSchema = new Schema<IOrderModel>(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    userRef: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrderModel>("order", orderSchema);
