const { Schema, model } = require('mongoose');

const ListSchema = new Schema({
    username: { type: String, required: true },
    namelist: { type: String, required: true },
    description: { type: String},
    items: { type: Array,  default:[]},
    create_at: {type: Date, default: Date.now }
});

module.exports = model('List', ListSchema);