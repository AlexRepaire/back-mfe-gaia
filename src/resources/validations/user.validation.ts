import { body, check, checkSchema, param } from "express-validator";

const userDataLoginValidateSchemaBased = checkSchema({
  email: {
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Provide valid email" },
  },
  password: {
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "password should be string" },
    isLength: {
      options: { min: 3 },
      errorMessage: "Password should be at least 3 characters",
    },
  },
});

const userDataRegisterValidateSchemaBased = checkSchema({
  email: {
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Provide valid email" },
  },
  password: {
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "password should be string" },
    isLength: {
      options: { min: 3 },
      errorMessage: "Password should be at least 3 characters",
    },
  },
});

const userDataResetPasswordValidateSchemaBased = checkSchema({
  email: {
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Provide valid email" },
  },
});

/** ALTERNATIVE CI-DESSOUS */

// const userDataLoginValidateChain = [
//   body("email")
//     .exists()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Provide valid email"),
//   body("password")
//     .exists()
//     .withMessage("Password is required")
//     .isString()
//     .withMessage("Password should be string")
//     .isLength({ min: 5 })
//     .withMessage("Password should be at least 5 characters"),
// ];

// const userDataRegisterValidateChain = [
//   body("email")
//     .exists()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Provide valid email"),
//   body("password")
//     .exists()
//     .withMessage("Password is required")
//     .isString()
//     .withMessage("Password should be string")
//     .isLength({ min: 5 })
//     .withMessage("Password should be at least 5 characters"),
// ];

// const userDataResetPasswordValidateChain = [
//   body("email")
//     .exists()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Provide valid email"),
// ];

// const userIdValidateChain = param("id").exists().isString();

export {
  // userDataLoginValidateChain,
  // userDataRegisterValidateChain,
  // userDataResetPasswordValidateChain,
  // userDataValidateSchemaBased,
  // userIdValidateChain,
  userDataLoginValidateSchemaBased,
  userDataRegisterValidateSchemaBased,
  userDataResetPasswordValidateSchemaBased,
};
