const StatisticModel = require('../models/statistic-model')
const timerModel = require('../models/timer-model.js')

class StatisticService{
    async addLesson(user, date, duration){
        const newLesson = await StatisticModel.create({user, date, duration})
        return newLesson;
    }

    async GetStatisticByUser(id) {
        if(!id){
            throw Error ('id is not specified')
        }
        const statistic = await StatisticModel.find({user: id})
        return statistic;
    }
}

module.exports = new StatisticService();