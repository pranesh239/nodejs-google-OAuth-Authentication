const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const path =require('path') ;

const key = require('./config/keys');
const helper = require('./helper');

const root = require('./routes/index');
const auth = require('./routes/auth');

mongoose.connect(key.mongoURL, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname,'public')))

// PASSING PASSPORT
require('./config/passport')(passport);

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(cookie());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.h = helper;
    next();
});

app.use('/', root);
app.use('/auth', auth);

// PORT ADDRESS AND CONNECTION
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));