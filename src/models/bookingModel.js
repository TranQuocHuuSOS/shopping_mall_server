const { default: mongoose } = require("mongoose");
const PaymentDetailsSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      require: true,
      enum: ["cash_on_delivery", "credit_card"],
      default:"cash_on_delivery",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default:"pending",
    },
    transactionId: {
      type: String,
      require: true
    },
    amount: {
      type: Number,
      require: true
    }
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    require: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed","completed", "cancelled"],
    default: "pending"
  },
  paymentDetails: PaymentDetailsSchema,
  notes: {
    type: String
  },
  deliveryAddress:{
    type:String,
    require:true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
const BookingModel = mongoose.model("bookings", BookingSchema);
module.exports = BookingModel;
