import Service from './Service.js'

export default class UserService extends Service {
  constructor(userRepository) {
    super(userRepository)
  }

  validate(user) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return (
      user &&
      user.name &&
      user.email &&
      user.name.length <= 100 &&
      user.email.length <= 100 &&
      emailRegex.test(user.email)
    )
  }
}
