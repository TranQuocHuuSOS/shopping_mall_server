const asyncHandle = require("express-async-handler");
const BookingModel = require("../models/bookingModel");
require("dotenv").config();
const transporter = require("../config/emailConfig");

// send mail booking và status follow

const sendBookingEmail = async (populatedBooking) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: populatedBooking.user.email,
    subject: "Ong Tran Store",
    text: `Dear ${populatedBooking.user.fullname}, your booking for ${populatedBooking.product.title} in waiting confirm.`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendUpdateBookingEmail = async (populatedBooking) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: populatedBooking.user.email,
    subject: "Ong Tran Store",
    text: `Dear ${populatedBooking.user.fullname}, your booking for ${populatedBooking.product.title} is now ${populatedBooking.status}.`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
//Tạo mới booking

const createBooking = asyncHandle(async (req, res) => {
  const {
    user,
    product,
    paymentDetails = {},
    deliveryAddress,
    notes
  } = req.body;
  if (!user || !product || !deliveryAddress) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: user, product, totalPrice"
    );
  }
  const defaultPaymentDetails = {
    method: "cash_on_delivery",
    status: "pending",
    transactionId: "",
    amount: 0
  };
  const completePaymentDetails = {
    ...defaultPaymentDetails,
    ...paymentDetails
  };
  const newBooking = new BookingModel({
    user,
    product,
    paymentDetails: completePaymentDetails,
    deliveryAddress,
    notes
  });
  const savedBooking = await newBooking.save();
  const populatedBooking = await BookingModel.findById(savedBooking._id)
    .populate("user")
    .populate("product");
  await sendBookingEmail(populatedBooking);
  res.status(200).json({
    message: "Booking created successfully!!!",
    data: savedBooking
  });
});

// Lấy tất cả booking
const getAllBooking = asyncHandle(async (req, res) => {
  const { role } = req.user;
  let query = {};
  if (role === "admin") {
    query.status = { $ne: "cancelled" };
  }
  try {
    const bookings = await BookingModel.find(query)
      .populate("user")
      .populate("product");
    res.status(200).json({
      message: "Bookings fetched successfully!!!",
      data: bookings
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching bookings");
  }
});

// Cập nhật trạng thái booking
const changeStatusBooking = asyncHandle(async (req, res) => {
  const { bookingId, status } = req.body;
  if (!bookingId || !status) {
    res.status(400);
    throw new Error("Please Provide both bookingId and status");
  }
  const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const booking = await BookingModel.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  booking.status = status;
  booking.updatedAt = Date.now();
  const updatedBooking = await booking.save();
  const populatedBooking = await BookingModel.findById(updatedBooking._id)
    .populate("user")
    .populate("product");
  await sendUpdateBookingEmail(populatedBooking);
  console.log("update booking", updatedBooking);
  res.status(200).json({
    message: "Booking status updated successfully!!!",
    data: updatedBooking
  });
});

const getBookingByUserId = asyncHandle(async (req, res) => {
  const userId = req.user._id;
  try {
    const bookings = await BookingModel.find({ user: userId }).populate(
      "product"
    );
    res.status(200).json({
      message: "User bookings fetched successfully!!!",
      data: bookings
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching user bookings");
  }
});

module.exports = {
  createBooking,
  getAllBooking,
  changeStatusBooking,
  getBookingByUserId
};
