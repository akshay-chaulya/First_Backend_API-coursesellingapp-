const mongoose = require("mongoose");

const { DB_URI } = require("../config");

mongoose.connect(DB_URI);

// schemas
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      require,
      default: 0,
    },
    image_link: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdigital-course&psig=AOvVaw1bN-Upjccw8aukgmeePfR7&ust=1714762617488000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCg09fS74UDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const Admin = new mongoose.model("Admin", adminSchema);
const User = new mongoose.model("User", userSchema);
const Course = new mongoose.model("Course", courseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
