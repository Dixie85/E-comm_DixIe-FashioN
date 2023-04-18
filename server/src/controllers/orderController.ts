import { Order } from "../models/Orders";
import asyncHandler from "express-async-handler";
import { connect, close } from "../../db/mongo.config";

import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { IProductSizes } from "../interfaces/interfaces";
import { Product } from "../models/Products";

// @desc Get all pending orders
// @route GET /order
// @access Private
export const getAllPendingOrders = asyncHandler(async (_req, res): Promise<any> => {
  // Get orders
  const pendingOrders = await connect(() => Order.find({ status: 'pending' }).select("-_id -__v").lean().exec());
  close();
  
//   If no orders
  if (!pendingOrders?.length) {
    return res.status(400).json({ message: "No pending orders found" });
  }

  res.json(pendingOrders);
});


// @desc Cancel order
// @route PATCH /order/canceled
// @access Private
export const cancelOrder = asyncHandler(async (req, res): Promise<any> => {
  const { orderNumber } = req.body;

  // Confirm data
  if (!orderNumber) {
    return res.status(400).json({ message: "Data is missing" });
  }

  // Find order and update status
  const findOrder = await connect(() =>
    Order.updateOne({ orderNumber }, { status: "canceled" }).lean().exec()
  );
  close();
  console.log(findOrder);

  if (findOrder.matchedCount === 1) {
    //created
    res.status(201).json({ message: `Status changet to canceled` });
  } else {
    res.status(404).json({ message: `Order number ${orderNumber} not found` });
  }
});


// @desc Shipped order
// @route PATCH /order/shipped
// @access Private
export const shippedOrder = asyncHandler(async (req, res): Promise<any> => {
  const { orderNumber } = req.body;

  // Confirm data
  if (!orderNumber) {
    return res.status(400).json({ message: "Data is missing" });
  }

  // Find order and update status
  const findOrder = await connect(() =>
    Order.updateOne({ orderNumber, status: 'pending' }, { status: "shipped" }).lean().exec()
  );
  close();
  console.log(findOrder);

  if (findOrder.matchedCount === 1) {
    //created
    res.status(201).json({ message: `Status changet to shipped` });
  } else {
    res
      .status(404)
      .json({ message: `The status of the order with number ${orderNumber} has changed. No shipping required` });
  }
});


// // @desc Create new order
// // @route POST /order
// // @access Private
// export const newOrder = asyncHandler(async (req, res): Promise<any> => {
//   const { deliveryAddress, sum, userId} = req.body;
  
//   // Confirm data
//   if (!deliveryAddress || !sum || !userId) {
//     return res.status(400).json({ message: "Data is missing" });
//   }

//   // Find total nuber of orders
//   const orderNumber = await connect(() => Order.count().lean().exec());

//   const orderObject = {
//     deliveryAddress,
//     sum,
//     orderNumber: (orderNumber + 1),
//     userRef: userId,
//   };

//   // Create new order
//   const order = await connect(() => Order.create(orderObject));
//   close();
//   if (order) {
//     //created
//     res.status(201).json({ message: `A new order was made`, order });
//   } else {
//     res.status(400).json({ message: "Invalid user data received" });
//   }
// });

// @desc Create new order
// @route POST /order
// @access Private
export const newOrder = asyncHandler(async (req, res): Promise<any> => {
  const { fullName ,deliveryAddress, sum, userId, cart } = req.body; // error
  
  //For testing !!!
  // if (!error) { 
  //   //created
  //   return res.status(201).json({ message: `A confirmation and details about your order will arrive on your email shortly` });
  // } else {
  //   return res.status(400).json({ message: "Invalid user data received" });
  // }

  // Confirm data
  if (!fullName || !deliveryAddress || !sum || !userId || !cart) {
    return res.status(400).json({ message: "Data is missing" });
  }
  
  // Update quantity of all products in the cart
  for( const pro of cart) {
    let stock = 0;
    const sizesEntries = Object.entries(pro.cartQuantity as IProductSizes)

    const product = await connect(() => Product.findById(pro._id).select("-__v").exec())

    // Iterating through all provided sizes and substructing quantity
    for(const s of sizesEntries) {      
        const quantityCheck = product.size[s[0]] -= s[1]
        if(quantityCheck < 0) {
            close()
            return res.status(400).json({ message: `Sonething went wrong, ${product.name} is out of stock.` })
        }
        stock += quantityCheck
    }
    // Updating the tottal stock 
    product.stock = stock
    await product.save()
  }

  // Find total nuber of orders
  const orderNumber = await connect(() => Order.count().lean().exec());

  const orderObject = {
    deliveryAddress,
    sum,
    orderNumber: (orderNumber + 1),
    userRef: userId,
  };

  // Create new order
  const order = await connect(() => Order.create(orderObject));
  close();
  if (order) {
    console.log(order, "order");
    
    //created
    res.status(201).json({ message: `A confirmation and details about your order will arrive on your email shortly` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

export const sendOrderBill = asyncHandler(async (req, res): Promise<any> => {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.G_EMAIL,
      pass: process.env.G_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "DixIe FashioN",
      link: "http://localhost:3000/",
    },
  });

  let response = {
    body: {
      name: "Dixie Dev",
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.G_EMAIL,
    to: userEmail,
    subject: "Place Order",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error: any) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
});