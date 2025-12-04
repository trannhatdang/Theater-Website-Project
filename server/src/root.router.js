import express from 'express'
import authController from './controllers/auth.controller.js'
import filmController from './controllers/film.controller.js'
import employeeController from './controllers/employee.controller.js'
import eventController from './controllers/event.controller.js'
import theaterController from './controllers/theater.controller.js'
import customerController from './controllers/customer.controller.js'
import billController from './controllers/bill.controller.js'
import promotionController from './controllers/promotion.controller.js'

const rootRouter = express.Router();

//rootRouter.use('/auth{/*type}', authController); 
rootRouter.use('/film{/*type}', filmController);
rootRouter.use('/employee{/*type}', employeeController);
//rootRouter.use('/event{/*type}', eventController);
rootRouter.use('/promotion{/*type}', promotionController);
rootRouter.use('/bill{/*type}', billController);
rootRouter.use('/theater{/*type}', theaterController);
rootRouter.use('/customer{/*type}', customerController);

export default rootRouter;
