import express from 'express';
import router from './src/routes.js';
import bodyParser from 'body-parser';
import { errorHandler } from './src/config/errors.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_request, response) => {
  response.json({
    name: "commercial-tax order server",
    endpoints: {
      health: "/health",
      orders: "/orders",
    },
  });
});

app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App is listening at port", PORT);
});