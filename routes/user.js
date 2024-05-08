const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const { JWT_PSSWORD } = require("../config");
const { User, Course } = require("../db/index");
const {
  verifyingSignupDetails,
  verifyingLoginDetails,
} = require("../middleware/inputs_verification/index");
const userMiddleware = require("../middleware/user");

router.post("/signup", verifyingSignupDetails, async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ name, email });
  if (exist) {
    res.status(403).json({ msg: "user is already exist" });
    return;
  }
  const newUser = new User({ name, email, password });
  await newUser.save();

  const token = jwt.sign({ email }, JWT_PSSWORD);

  res.json({ msg: "Your account succsefuly created", token: token });
});

router.post("/signin", verifyingLoginDetails, async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email });

  if (!exist) {
    res.status(411).json({ msg: "This account doesn't exist" });
    return;
  }

  if (exist.password !== password) {
    res.status(411).json({ msg: "Incorrect password" });
    return;
  }

  const token = jwt.sign({ email }, JWT_PSSWORD);
  res.json({ msg: "succsefuly loged in", token });
});

router.get("/courses", userMiddleware, async (req, res) => {
  const users = await Course.find({});
  res.json(users);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const exist = await Course.findOne({ _id: courseId });
    if (!exist) {
      res.status(404).json({ msg: "Course not found" });
      return;
    }
  } catch (err) {
    if (err) {
      res.status(400).json({ msg: "invalid course id" });
      return;
    }
  }
  const email = req.email;

  // const exist = await User.findOne({ email, purchasedCourses: courseId });

  // if (exist) {
  //   res.status(400).json({ msg: "This course id is already exist" });
  //   return;
  // }

  await User.updateOne(
    {
      email,
    },
    {
      $push: {
        purchasedCourses: new mongoose.Types.ObjectId(courseId),
      },
    }
  );
  res.json({ msg: "Purchase complete!" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const email = req.email;

  const user = await User.findOne({ email });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  if (!courses.length) {
    res.status(404).json({ msg: "Can't find any purchased courses" });
    return;
  }

  res.json(courses);
});

router.post(
  "/purchasedCourses/delete/:courseId",
  userMiddleware,
  async (req, res) => {
    const courseId = req.params.courseId;
    const email = req.email;

    try {
      const exist = await User.findOne({ email, purchasedCourses: courseId });
      if (!exist) {
        res
          .status(400)
          .json({ msg: "user purchased courses id dosen't match " });
        return;
      }
    } catch (err) {
      if (err) {
        res.status(403).json({ msg: "invalid course id" });
        return;
      }
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { purchasedCourses: courseId } },
      { new: true }
    );
    res.json(user);
  }
);

module.exports = router;
