import express from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
