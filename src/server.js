// import express
import express from 'express';

// import bodyParser
import bodyParser from 'body-parser';

// import dotenv for environment variables management
import dotenv   from 'dotenv';

import cors from 'cors';

import appRouter from './routes/index';

// instantiate dotenv
dotenv.config();

// initialize express
const app = express();

// configure body-parser for express
app.use(bodyParser.json({ extended: true }));

app.use(cors());

// handles all the routing
app.use(appRouter);


const PORT = process.env.PORT || 5000;

// start the express server
app.listen(PORT, () => {
  console.log(`App started on https://localhost:${PORT}`);
});
