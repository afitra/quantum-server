var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
const hash = require('../helper/hash')
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            validator: function uniqueEmail(inputEmail) {
                return new Promise((resolve, reject) => {
                    this.model('Users').findOne({
                            email: inputEmail
                        })
                        .then(function (result) {
                            if (result) {
                                throw new Error('Email already exists')
                            } else {
                                resolve()
                            }
                        })
                        .catch(function (err) {
                            reject(err.message)
                        })
                })
            }
        }]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: String
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hash(this.password)
    }
    next()
})







let User = mongoose.model('Users', userSchema)


module.exports = User