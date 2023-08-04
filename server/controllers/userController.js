const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} = require('../errors')

const register = async (req, res) => {
  const { name, username, password, cpassword } = req?.body
  console.log({ name, username, password, cpassword })
  const userExist = await User.findOne({ username })
  if (userExist)
    throw new BadRequestError('Account with this username already exist')
  if (password !== cpassword)
    throw new BadRequestError('Both password should match')
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user })
}
const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new UnauthenticatedError('Please provide username and password')
  }
  const user = await User.findOne({ username }).select('+password')
  const isPasswordCorrect = await user?.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  res.status(StatusCodes.OK).json({ user })
}

module.exports = {
  register,
  login,
}
