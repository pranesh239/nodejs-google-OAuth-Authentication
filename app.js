const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

const key = require('./config/keys');
const auth = require('./routes/auth');

mongoose.connect(key.mongoURL, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

    // PASSING PASSPORT
require('./config/passport')(passport);


app.get('/', (req, res) => {
    res.send('It works');
});
app.use('/auth', auth);



// PORT ADDRESS AND CONNECTION
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));