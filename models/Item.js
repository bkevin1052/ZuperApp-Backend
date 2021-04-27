const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String},
    price: { type: String}
});

module.exports = model('Item', ItemSchema);