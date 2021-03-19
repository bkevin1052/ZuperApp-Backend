const { Schema, model } = require('mongoose');

const ServiceSchema = new Schema({
    id: { type: Int, required: true },
    servicename: { type: String, required: true },
    description: { type: String, required: true },
    items: { type: String, required: true }
});

module.exports = model('Service', ServiceSchema);