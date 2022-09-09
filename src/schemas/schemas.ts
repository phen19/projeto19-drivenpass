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
  }),
  noteSchema: joi.object().keys({
    title: joi.string().max(50).required(),
    note: joi.string().max(1000).required()
  }),
  cardSchema: joi.object().keys({
    title: joi.string().required(),
    cardHolderName: joi.string().required().pattern(/^[\p{Lu}\p{Mark}\s]+$/u)
    .message(
      `"Cardholder Name" must only contain uppercase letters and whitespace`
    ),
    number: joi.string().pattern(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/).message(`"Card Number" must follow the ####-####-####-#### pattern`).required(),
    securityCode: joi.string().regex(/^\d+$/).message(`"Security Code" must contain only numbers`).length(3).required(),
    expireDate: joi.string().length(5).pattern(/^[0-9]{2}\/[0-9]{2}$/).message(`"Expiration Date" must follow format MM/YY`).required(),
    password: joi.string().regex(/^\d+$/).min(4).max(6).required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid('debit', 'credit', 'both')
  })
};

