import express from "express"
const order = express.Router()
import { shippedOrder, newOrder, cancelOrder, getAllPendingOrders, getUserOrder } from "../controllers/orderController"

order.route('/')
    .get(getAllPendingOrders)
    .post(newOrder)

order.route('/:id')
    .get(getUserOrder)

order.route('/canceled')
    .patch(cancelOrder)

order.route('/shipped')
    .patch(shippedOrder)


export default order

