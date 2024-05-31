const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GalaxySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    distance: { type: Number, required: true },
    photo: { type: String }
});

// Добавьте индекс для поля "name"
GalaxySchema.index({ name: 1 });

const Galaxy = mongoose.model('Galaxy', GalaxySchema);

module.exports = Galaxy;


