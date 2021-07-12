const express = require('express');
const path = require('path');
const port = 850;
const app = express();
const bodyParser = require('body-parser');

//connecting to Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDanceSite', {useNewUrlParser: true, useUnifiedTopology: true});

//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String
}); 

//mongoose model
let Contact = mongoose.model('Contact',contactSchema);

//EXPRESS specific
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//Template engine Pug

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//End Points

app.get('/',(req,res)=>{
    let params = {
      
    };
    res.status(200).render('home.pug');
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        // res.send('Item has been saved');
        console.log("Saved")
    }).catch(()=>{
        res.status(400).send('Item  not saved');
    });
    res.status(200).render('contact.pug');
});


//Starting the Server
app.listen(port,'127.0.0.1',()=>{
    console.log('Server Started');
});
