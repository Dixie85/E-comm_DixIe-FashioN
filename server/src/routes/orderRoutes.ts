import express from "express"
const order = express.Router()
import { shippedOrder, newOrder, cancelOrder, getAllPendingOrders } from "../controllers/orderController"

order.route('/')
    .get(getAllPendingOrders)
    .post(newOrder)

order.route('/canceled')
    .patch(cancelOrder)

order.route('/shipped')
    .patch(shippedOrder)


export default order

