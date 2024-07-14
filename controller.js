
// xui dimbI
const timerModel = require("./models/timer-schema.js");
const timerService = require("./service/timer-service.js")
const StatisticService = require("./service/statistic-service.js")
const events = require('events');
const statisticService = require("./service/statistic-service.js");

const emitter = new events.EventEmitter();

class Controller {

   async subscribe(req, res) {
      emitter.once('updateTimer', (command) => {
         return res.json(command)
      })
   }

   async getOne(req, res) {
      try {
         const timer = await timerService.GetCurrentState(req.params.id);
         return res.json(timer);
      }
      catch (e) {
         res.status(500).json(e.message)
      }
   }

   async start(req, res) {
      try {
         const command = req.body
         const newTimer = await timerService.startTimer(command)
         emitter.emit('updateTimer', newTimer)
         return res.status(200).json(newTimer)
      }
      catch (e) {
         res.status(500).json(e.message)
      }
   }

   async stop(req, res) {
      try {
         const command = req.body
         console.log(command)
         const updatedTimer = await timerService.stopTimer(command);
         emitter.emit('updateTimer', updatedTimer)
         return res.status(200).json(updatedTimer)
      }
      catch (e) {
         res.status(500).json(e.message)
      }
   }

   async statisticByUser(req, res) {
      try {
         const statistic = await statisticService.GetStatisticByUser(req.params.id);
         return res.json(statistic);
      }
      catch (e) {
         res.status(500).json(e.message)
      }
   }

   async post(req, res) {
      const name = req.body;
      const timer = await timerModel.create(name)
      return res.status(200).json(timer)
   }
}

module.exports = new Controller();