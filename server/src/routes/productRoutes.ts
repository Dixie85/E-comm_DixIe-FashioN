import express from "express"
const product = express.Router()
import { addStock, createNewProduct, deductStock, deleteProduct, getAllProducts } from "../controllers/productController"
import verifyJWT from "../middleware/verifyJWT"
import authCheckAdmin from "../middleware/authCheckAdmin"

product.route("/")
  .get(getAllProducts)
  .post(verifyJWT, authCheckAdmin, createNewProduct)
  .delete(verifyJWT, authCheckAdmin, deleteProduct)

product.use(verifyJWT)

product.route("/deductsize")
  .patch(deductStock)

product.route("/addsize")
  .patch(addStock)

export default product
