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
    isVirtual: joi.boolean().strict().required(),
    type: joi.string().valid('debit', 'credit', 'both')
  }),
  wifiSchema: joi.object().keys({
    networkName: joi.string().required(),
    title: joi.string().required(),
    password: joi.string().required(),
  }),
  documentSchema: joi.object().keys({
    fullName: joi.string().required(),
    type: joi.string().valid('RG', 'CNH'),
    emissionDate: joi.string().length(10).pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).message(`"Emission date" must be in DD/MM/YYYY format`).required(),
    expireDate: joi.string().length(10).pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).message(`"Expire date" must be in DD/MM/YYYY format`).required(),
    number: joi.string().required(),
    issuer: joi.string().required()
  })
};

