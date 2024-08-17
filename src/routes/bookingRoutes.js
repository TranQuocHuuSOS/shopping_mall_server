const Router = require("express");
const {createBooking, getAllBooking, changeStatusBooking, getBookingByUserId} = require("../controllers/bookingController");
const bookingRouter= Router();
const authMiddleware = require("../middlewares/authMiddleWare");
bookingRouter.post('/create', createBooking);
bookingRouter.get('/getAll',authMiddleware,getAllBooking);
bookingRouter.put('/changeStatus', changeStatusBooking);
bookingRouter.get('/getByUserId',authMiddleware,getBookingByUserId);
module.exports= bookingRouter;