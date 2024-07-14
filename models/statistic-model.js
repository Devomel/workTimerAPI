const {Schema, model} = require('mongoose')

const StatisticSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: String,  required: true},
    duration: {type: String,  required: true},
})

module.exports = model('Statistic', StatisticSchema)