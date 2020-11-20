const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const UserViewSchema = new Schema({
    UserId: { type: String},
    date: {type:Date},
    ProductId: {type:String,}
});

module.exports = mongoose.model('userView', UserViewSchema, 'userView');
