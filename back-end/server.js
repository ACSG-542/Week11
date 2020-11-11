var express = require('express');
var app = express();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/itemsdb');
var itemSchema = require('./item_schema.js').itemSchema;
var Items = mongoose.model('Items', itemSchema);

mongoose.connection.once('open', function(){
    app.use(express.static('../front-end/dist/front-end/'))
    app.use('/', express.query());
    app.use(express.json());

    app.get('/items', function (request, response) {
        var query = Items.find();
        query.exec(function (err, docs){
            response.status(200);
            response.send(JSON.stringify({docs}));
        });
    })

    app.post('/item', function (request, response) {
        var newItem = new Items({
            item: request.body.item
        });
        newItem.save(function (err, doc) {
            response.status(200);
            response.send(JSON.stringify(doc));
        })
    })

    app.delete("/remove", function(request, response) {    
        
        Items.deleteOne({_id: request.body._id}).exec(function (err, doc) {
            response.status(200);
            response.send(JSON.stringify(doc));
        })       
    })

    app.listen(8080, function () {
        console.log('Application is running!');
    })
});
