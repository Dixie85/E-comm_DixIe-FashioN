import app from './src/app';

app.listen(process.env.PORT, (): void => {
  console.log(`Server is runing on port ${process.env.PORT}`);
});