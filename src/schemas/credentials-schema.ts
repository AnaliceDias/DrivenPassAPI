import joi from "joi";

export const createCredential = joi.object({
  alias: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
  url: joi.string().min(1).required(),
  username: joi.string().min(1).required(),
});