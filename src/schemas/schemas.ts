import joi from "joi";

export const schemas = {
  authSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
  }),
  credentialSchema: joi.object().keys({
    url: joi.string().required().uri(),
    title: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
  })
};