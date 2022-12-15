import joi from "joi";

export const createUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});

export const singInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});