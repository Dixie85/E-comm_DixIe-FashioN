import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";
import { errorHandler, getAllProducts } from "./controllers/controller";
import cors from "cors";
console.log(process.env.PORT);


const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("db"));

app.get("/api/products", getAllProducts);

app.use(errorHandler);

export default app;
