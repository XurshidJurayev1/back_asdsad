const express = require('express');
const errorHandling = require('./middleware/ErrorHandlingMiddleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const router = require('./routes/index');
const dotenv = require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());


app.use('/api', router);
app.use('/', function (req, res, next) {
  return res.send('hello');
});

// error Handler
app.use(errorHandling);

// const PORT = config.get('port') || 5000;
const PORT = 5000;
const DB = process.env.MONGODB_URL;


async function run(PORT) {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(DB, {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log(`DB ulnadi`);
      });
      app.listen(5000, () => console.log(`App successfuly started on ${PORT}...`));
    } else {
      await mongoose.connect(DB, {
        // useCreateIndex: true,
        useNewUrlParser: true, useUnifiedTopology: true,

      });
      app.listen(PORT, () => console.log(`App error started on ${PORT}...`));
      console.log('else');
    }

  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }

}

run(PORT);





