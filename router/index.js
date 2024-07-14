const Router = require('express').Router;
const authController = require('../controller/auth-controller.js');
const timerController = require('../controller/timer-controller.js')
const router = new Router;
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware.js');

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min:3, max: 32}), 
    authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware, authController.getUsers);
router.get('/getcurrentstate', authMiddleware, timerController.getCurrentState);
router.get('/statistic', authMiddleware, timerController.statisticByUser);
router.put('/start', authMiddleware, timerController.start);
router.put('/pause', authMiddleware, timerController.pause)
router.post('/stop', authMiddleware, timerController.stop);

module.exports = router;