const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

const { JWT_PSSWORD } = require("../config");

const { Admin, Course } = require("../db/index");
const {
  verifyingSignupDetails,
  verifyingLoginDetails,
  verifyingCourseDetails,
} = require("../middleware/inputs_verification/index");

const adminMiddleware = require("../middleware/admin");

router.post("/signup", verifyingSignupDetails, async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await Admin.findOne({ name, email });
  if (exist) {
    res.status(403).json({ msg: "user is already exist" });
    return;
  }
  const newAdmin = new Admin({ name, email, password });
  await newAdmin.save();

  const token = jwt.sign({ email }, JWT_PSSWORD);

  res.json({ msg: "Your admin account succsefuly created", token: token });
});

router.post("/signin", verifyingLoginDetails, async (req, res) => {
  const { email, password } = req.body;
  const exist = await Admin.findOne({ email });

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

router.post(
  "/courses",
  verifyingCourseDetails,
  adminMiddleware,
  async (req, res) => {
    let { title, description, price, image_link } = req.body;
    const exist = await Course.findOne({ title });
    if (exist) {
      res.status(403).json({ msg: "This course alrady exist" });
      return;
    }

    const newCourse = new Course({ title, description, price, image_link });
    await newCourse.save();
    res.json({ msg: `${title} has added sucssesfuly` });
  }
);

router.post("/courses/delete/:courseId", adminMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findOneAndDelete({ _id: courseId });
    if (!course) {
      res.status(400).json({ msg: "dosen't have any id" });
      return;
    }
    res.json(course);
  } catch (err) {
    res.status(403).json({ msg: "invalid id" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const users = await Course.find({});
  res.json(users);
});

module.exports = router;
