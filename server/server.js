const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
import {readdirSync} from 'fs';
const cors = require('cors')
const mongoose = require('mongoose');
import cookieParser from 'cookie-parser'
import csrf from 'csurf';

const csrfProtection = csrf({cookie: true})

//app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => console.log('not connected'));

  // middleware
  app.use(morgan('dev'));
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())

  // route
  readdirSync('./routes').map((r) => 
  app.use('/api', require(`./routes/${r}`))
  );
  // csrf
  app.use(csrfProtection);

  app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
  })
 

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})