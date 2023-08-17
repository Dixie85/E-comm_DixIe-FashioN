import { Order } from "../models/Orders";
import asyncHandler from "express-async-handler";
import { connect, close } from "../../db/mongo.config";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { IProductSizes } from "../interfaces/interfaces";
import { Product } from "../models/Products";
import { Users } from "../models/Users";

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

// @desc Users orders by ID
// @route GET /order/:id
// @access Private
export const getUserOrder = asyncHandler(async (req, res): Promise<any> => {
  const {id} = req.params
  // Get orders
  const userOrders = await connect(() => Order.find({userRef: id }).sort({createdAt: -1}).select("-__v").lean().exec());
  close();
  
//   If no orders
  if (!userOrders?.length) {
    return res.status(400).json({ message: "No orders found" });
  }

  res.json(userOrders);
});



// @desc Cancel order
// @route PATCH /order/canceled
// @access Private
export const cancelOrder = asyncHandler(async (req, res): Promise<any> => {
  const { _id } = req.body;

  // Confirm data
  if (!_id) {
    return res.status(400).json({ message: "Data is missing" });
  }

  // Find order and update status
  const findOrder = await connect(() =>
    Order.updateOne({ _id }, { status: "canceled" }).lean().exec()
  );
  close();
  console.log(findOrder);

  if (findOrder.matchedCount === 1) {
    //created
    res.status(201).json({ message: `Status changet to canceled` });
  } else {
    res.status(404).json({ message: `Order number ${_id} not found` });
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


// @desc Create new order
// @route POST /order
// @access Private
export const newOrder = asyncHandler(async (req, res): Promise<any> => {
  const { fullName ,deliveryAddress, sum, userId, cart } = req.body; // error
  
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
    const user = await connect(() => Users.findById(userId).select("-__v").exec())
    console.log(user, 'user');
    console.log(order, "order");
    
    close();
    // confirmaOrder( user.email, cart )

    let config = {
      service: "gmail",
      auth: {
        user: process.env.G_EMAIL,
        pass: process.env.G_PASSWORD,
      },
    };
  
    let transporter = nodemailer.createTransport(config);
  
    let MailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "DixIe FashioN",
        link: process.env.BASE_URL as string,
      },
    });
  
    let response = {
      body: {
        name: user.username,
        intro: `Your order number is ${order.orderNumber}`,
        table: {
          data: cart.map((pro: { name: any; description: any; price: any; }) => {
            return {
            item: pro.name,
            description: `${pro.description.slice(0,50)}...`,
            price: pro.price,}
          }),
          columns: {
            // Optionally, customize the column widths
            customWidth: {
                item: '30%',
                price: '15%'
            },
            // Optionally, change column text alignment
            customAlignment: {
                price: 'right'
            }
          }
        },
        outro: "Looking forward to do more business",
      },
    };
  
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: process.env.G_EMAIL,
      to: user.email,
      subject: `Order No ${order.orderNumber}, confirmation and details`,
      html: mail,
    };
  
    transporter.sendMail(message)


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
      link: process.env.BASE_URL as string,
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
});
