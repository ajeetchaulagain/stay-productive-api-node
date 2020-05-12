import express from 'express';

const app = express();
const PORT = 3000;

const test = () => {
  console.log(test);
};

test();

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
