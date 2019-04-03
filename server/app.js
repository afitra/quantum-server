const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'webProfile';

// Create a new MongoClient
const client = new MongoClient(url, {
    useNewUrlParser: true
});


const express = require('express'),
    app = express(),
    routerUser = require('./routes/routerUser'),
    routerGallery = require('./routes/routerGallery'),
    routerProject = require('./routes/routerProject'),
    port = 3000,
    cors = require('cors'),
    mongoose = require('mongoose');


mongoose.set('findAndUpdate', false)
// mongoose.connect('mongodb://localhost:27017/webProfile-dev', {
//     useNewUrlParser: true
// })

mongoose.connect('mongodb+srv://afitra:afitra@lamaran-anzh1.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extends: false
}))
app.use('/project', routerProject)
app.use('/gallery', routerGallery)
app.use('/users', routerUser)
module.exports = app

app.listen(port, function () {
    console.log(`live on port ${port} ######*******`);
    console.log(`connect data base on ${dbName}  ######*******`);
})