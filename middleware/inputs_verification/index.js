const zod = require("zod");

// zod verifying the inputs
const signupZod = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(5),
});

const loginZod = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const courseZod = zod.object({
  title: zod.string(),
  price: zod.number(),
  description: zod.string().default(""),
  image_link: zod.string().default(""),
});

function verifyingSignupDetails(req, res, next) {
  const response = signupZod.safeParse(req.body);

  responsed(response, res, next);
}

function verifyingLoginDetails(req, res, next) {
  const response = loginZod.safeParse(req.body);

  responsed(response, res, next);
}

function verifyingCourseDetails(req, res, next) {
  const response = courseZod.safeParse(req.body);

  responsed(response, res, next);
}

function responsed(response, res, next) {
  if (!response.success) {
    res
      .status(400)
      .json({
        msg: `${response.error.issues[0].path[0]} ${response.error.issues[0].message}`,
      });
    // res.status(400).json(response);
    return;
  }

  next();
}

module.exports = {
  verifyingSignupDetails,
  verifyingLoginDetails,
  verifyingCourseDetails,
};
