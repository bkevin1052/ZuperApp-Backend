const { Schema, model } = require('mongoose');

const ListSchema = new Schema({
    id: { type: Int, required: true },
    username: { type: String, required: true },
    namelist: { type: String, required: true },
    description: { type: String, required: true },
    items: { type: String, required: true },
    create_at: {type: Date, required: Date.now }
});

module.exports = model('List', ListSchema);