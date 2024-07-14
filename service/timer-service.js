const TimerModel = require('../models/timer-model.js');
const StatisticService = require("../service/statistic-service.js")

class TimerService{
    async newTimer(user) {
        const userId = user.id;
        const newTimer =  await TimerModel.create({user: userId, startTime: "0"})
        if(!newTimer)
            res.status(500).json('error with creating timer for a new user')
        return newTimer;
    }

    async startTimer(userId, body) {
        const currentTimer = await TimerModel.findOne({user: userId});
        currentTimer.isGoing = true;
        const time = body.startTime;
        if(currentTimer.startTime == 0)
            currentTimer.startTime = time;
        else
            currentTimer.startTime = time - currentTimer.duration;
        const newTimer = await TimerModel.findOneAndUpdate({user: userId}, currentTimer, {new: true})
        return newTimer;
    }

    async pauseTimer(user, timer) {
        const currentTimer = await TimerModel.findOne({user: user.id});
        currentTimer.isGoing = false;
        currentTimer.duration = timer.duration;
        const newTimer = await TimerModel.findOneAndUpdate({user: user.id}, currentTimer, {new: true})
        return newTimer;
    }

    async stopTimer(user, timer) {
        const userId = user.id
        const date = timer.date
        const duration = timer.duration
        const currentTimer = await TimerModel.findOne({user: userId});
        currentTimer.isGoing = false;
        currentTimer.startTime = 0;
        currentTimer.duration = 0;
        const updatedTimer = await TimerModel.findOneAndUpdate({user: userId}, currentTimer, {new: true})
        const newLesson = await StatisticService.addLesson(userId, date, duration);
        if (!newLesson) {
            res.status(500).json('saving statistic has been failed')
        }
        return {newLesson, updatedTimer};
    }

    async getOne (user) {
        const userId = user.id;
        if(!userId){
            throw Error ('id is not specified')
        }
        const timer = await TimerModel.findOne({user: userId})
        return timer;
    }
}

module.exports = new TimerService();