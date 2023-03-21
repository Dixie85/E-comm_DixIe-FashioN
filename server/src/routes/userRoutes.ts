import express from "express"
const user = express.Router()
import { createNewUser, deleteUser, getAllUsers } from "../controllers/usersController"

user.route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .delete(deleteUser)

export default user
