var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var port = process.env.port || 3000;
app.use("/", express.static(path.resolve("./client/")));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
// API

app.post('/api/login', function(req, res) {
    console.log(req.body);
    if(req.body.email && req.body.password) {
        return res.json({ success: true, userName: req.body.email, message: 'Successfully login.' });
    }
    return res.json({ success: false, userName: '', message: 'Wrong email and password try again!' });
});


app.get('*', function(req, res) {
    res.sendFile(path.resolve('./client/index.html'));
});


app.listen(port, function() {
    console.log("PORT:3000 \n http://localhost:3000");
    console.log(__dirname + "/../client/");
})