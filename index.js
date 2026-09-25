import express from 'express';
import router from './routes.js';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { errorHandler } from './errors.js';

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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