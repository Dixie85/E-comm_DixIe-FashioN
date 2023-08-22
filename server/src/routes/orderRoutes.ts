import express from "express"
const order = express.Router()
import { shippedOrder, newOrder, cancelOrder, getAllPendingOrders, getUserOrder } from "../controllers/orderController"
import verifyJWT from "../middleware/verifyJWT"
import authCheckAdmin from "../middleware/authCheckAdmin"

order.use(verifyJWT)

order.route('/')
    .get(authCheckAdmin, getAllPendingOrders)
    .post(newOrder)

order.route('/:id')
    .get(getUserOrder)

order.route('/canceled')
    .patch(cancelOrder)

order.route('/shipped')
    .patch(authCheckAdmin, shippedOrder)


export default order