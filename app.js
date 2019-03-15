const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://praneshpsg239:Qwerty000@myapp-dchog.mongodb.net/test?retryWrites=true',{ useNewUrlParser:true, useCreateIndex: true })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));


app.get('/',(req, res) => {
    res.send('It works');
})



// PORT ADDRESS AND CONNECTION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));