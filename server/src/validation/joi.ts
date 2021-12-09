import { ObjectSchema, ValidationError } from '@hapi/joi'
import { BadRequest } from '../errors'

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false })
  } catch (e) {
    let message
    if(e instanceof ValidationError) {
      message = e.message
    }
    throw new BadRequest(message)
  }
}
