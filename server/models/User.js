const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name required'],
    },
    username: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      // validate: {
      //   validator: function (value) {
      //     return validator.isStrongPassword(value, {
      //       minLength: 6,
      //       minLowercase: 1,
      //       minUppercase: 1,
      //       minNumbers: 1,
      //       minSymbols: 1,
      //     })
      //   },
      //   message:
      //     ' Password must be at least 6 characters long and contain, at least one uppercase letter, one lowercase letter, one number, one special charaters',
      // },
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}
module.exports = mongoose.model('User', UserSchema)
