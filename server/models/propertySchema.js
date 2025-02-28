const { mongoose } = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
    },
    location: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
    },
    beds: {
      type: Number,
      default: 1,
      required: true,
    },
    baths: {
      type: Number,
      default: 1,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
    },
    rates: {
      weekly: {
        type: Number,
        required: true,
      },
      monthly: {
        type: Number,
        required: true,
      },
      nightly: {
        type: Number,
        required: true,
      },
    },
    seller_info: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
