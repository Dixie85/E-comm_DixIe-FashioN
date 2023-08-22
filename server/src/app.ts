import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { getAllProducts } from "./controllers/controller";
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/authRoutes';
import user from './routes/userRoutes';
import corsOptions from './config/corsOptions';
import order from './routes/orderRoutes';
import product from './routes/productRoutes';

const app: Application = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static("db"));

app.get("/api/products", getAllProducts);
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/order", order);
app.use("/api/product", product);

app.use(errorHandler);

export default app;
