import express from "express"
const product = express.Router()
import { addStock, createNewProduct, deductStock, deleteProduct, getAllProducts } from "../controllers/productController"

product.route("/")
  .get(getAllProducts)
  .post(createNewProduct)
  .delete(deleteProduct)

product.route("/deductsize")
  .patch(deductStock)

product.route("/addsize")
  .patch(addStock)

export default product
