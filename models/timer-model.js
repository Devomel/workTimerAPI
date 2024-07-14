const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    isGoing: {type: Boolean, default: false},
    startTime: {type: String},
    duration: {type: String},
})

module.exports = model('Timer', UserSchema)