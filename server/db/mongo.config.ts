import mongoose from "mongoose";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.rwyvj.mongodb.net/${process.env.DB_NAME}`

const connect = async <T>(cb: T) => {
  await mongoose.connect(url, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //@ts-ignore
  const resault = cb();
  console.log("Open connection");
  return resault;
};

const close = async () => {
  setTimeout(() => {
    mongoose.connection.close(() => console.log("info:", "closing conneciton"));
  },5000)
  return;
};

export { connect, close };
