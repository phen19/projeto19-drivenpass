import joi from "joi";

export const schemas = {
  authSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
  }),
};