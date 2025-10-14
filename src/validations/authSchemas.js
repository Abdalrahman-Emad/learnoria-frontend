// src/validations/authSchemas.js
import * as Yup from "yup";

// Initial values for Register Form
export const registerInitialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "student",
};

// Yup validation schema
export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});
