const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "order name required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    userid: {
      type: String,
    },
    orderItems: [],
    // shippingAddress: {
    //   type: Object,
    // },
    shippingAddress: {
      address_line1: {
        type: String,
      },
     
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      postal_code: {
        type: String,
      },
    },

    orderAmount: {
      type: Number,
      //   required: true,
    },
    isDeliverd: {
      type: Boolean,
      default: false,
    },
    transectionId: {
      type: String,
      //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
