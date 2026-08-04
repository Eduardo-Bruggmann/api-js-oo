import Service from './Service.js'
import ValidationError from '../errors/ValidationError.js'

export default class UserService extends Service {
  constructor(userRepository) {
    super(userRepository)
  }

  validate(user) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!user) throw new ValidationError('Payload is required.')

    if (Object.keys(user).length > 2)
      throw new ValidationError('Too many fields in the payload.')

    if (Object.keys(user).some(key => !['name', 'email'].includes(key)))
      throw new ValidationError('Invalid field in the payload.')

    if (!user.name) throw new ValidationError('Name is required.')

    if (user.name.length > 100)
      throw new ValidationError(
        'Name must be less than or equal to 100 characters.',
      )

    if (!user.email) throw new ValidationError('Email is required.')

    if (user.email.length > 100)
      throw new ValidationError(
        'Email must be less than or equal to 100 characters.',
      )

    if (!emailRegex.test(user.email))
      throw new ValidationError('Email is invalid.')

    return true
  }
}
