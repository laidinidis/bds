import Joi from '@hapi/joi'
import { BCRYPT_MAX_BYTES } from '../config'

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required()

const name = Joi.string()
  .min(5)
  .max(128)
  .trim()
  .required()

const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAX_BYTES, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '"{#label}" must contain one uppercase letter, one lowercase letter, and one digit'
  )
  .required()

export const registerSchema = Joi.object({
  email,
  name,
  password
})

export const loginSchema = Joi.object({
  email,
  password
})

export const editSchema = Joi.object({
  email,
  name
})
