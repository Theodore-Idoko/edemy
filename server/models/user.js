const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 32
  },
  picture: {
    type: String,
    default: '/avatar.png',
  },
  stripe_account_id:'',
  stripe_seller:{},
  stripeSession:{},

  password: {
    type: String,
    required: true,
    min:6,
    max:64,
  },
  role: {
    type: [String],
    default: ['Subscriber'],
    enum:['Subscriber', 'Instructor', 'Admin']
  }, 
  passwordResetCode: {
    data: String,
    default:''
  }
},{ timestamps: true})


module.exports = mongoose.model('User', userSchema);