import express from 'express';

const app = express();

app.use(express.urlencoded());

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
