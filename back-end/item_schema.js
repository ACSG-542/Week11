var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({
    item: {type: String, index: 1, require:true}
}, {collection: 'items'});
exports.itemSchema = itemSchema;
