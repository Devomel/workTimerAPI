const timerModel = require("../models/timer-model.js");
const timerService = require("../service/timer-service.js")
const statisticService = require("../service/statistic-service.js");

class TimerController {

    async getCurrentState(req, res) {
        try{
            const user = req.user;
            const timer = await timerService.getOne(user);
            return res.status(200).json(timer);
        }
        catch(e){
            res.status(500).json(e.message)
        }   
    }

    async start(req, res) {
        try{ 
            const userId = req.user.id
            const newTimer = await timerService.startTimer(userId,  req.body)
            return res.status(200).json(newTimer)
        }
        catch(e){
            res.status(500).json(e.message)
        }   
    }

    
    async pause(req, res) {
        try{ 
            const user = req.user
            const timer = req.body
            const newTimer = await timerService.pauseTimer(user, timer)
            return res.status(200).json(newTimer)
        }
        catch(e){
            res.status(500).json(e.message)
        }   
    }

    async stop(req, res) {
        try{ 
            const user = req.user;
            const timer = req.body;
            const updatedTimer = (await timerService.stopTimer(user, timer)).newLesson;
            return res.status(200).json(updatedTimer)
        }
        catch(e){
            res.status(500).json(e.message)
        }   
    }

    async statisticByUser(req, res) {
        try{ 
            const userId = req.user.id;
            const statistic = await statisticService.GetStatisticByUser(userId);
            return res.status(200).json(statistic);
        }
        catch(e){
            res.status(500).json(e.message)
        }   
    }

    async post(req, res) {
        const name = req.body;
        const timer = await timerModel.create(name) 
        return res.status(200).json(timer)
    }
}

module.exports = new TimerController();