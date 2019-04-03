const Model = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt')
const smsGateway = require('sms-gateway-nodejs')('afitrahack@gmail.com', 'akun030396')
const axios = require('axios')
const mail = require('../helper/mail')
var nodemailer = require('nodemailer');

var email = require("mailer");
class Controller {


    static sms(req, res) {


        axios({
                baseURL: "https://smsgateway.me/api/v4/contact",
                method: "post",
                headers: {
                    "Authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImlhdCI6MTU1NDE4MzMzMCwiZXhwIjo0MTAyNDQ0ODAwLCJ1aWQiOjY5NzY2LCJyb2xlcyI6WyJST0xFX1VTRVIiXX0.dPN0kOIQ0323rvkoWpbX7AFtX3kUf2AP-YAzqcErF9E'
                },
                data: {
                    "Content": {
                        "name": "pribadi",
                        "phone_numbers": ["+6285624128280"]
                    }
                }
                // data: {
                //     "name": "koko",
                //     "phone_numbers": [
                //         "+447791065791",
                //         "+447791064782"
                //     ]
                // },
            })
            .then(data => {
                res.status(200).json(data.data)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    messege: err.message
                })
            });

        // mail('afitrahack@gmail.com', 'test kirim email', function (err, data) {
        //     if (data) {
        //         console.log('okok');
        //     } else {
        //         console.log(err);

        //     }
        // })
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'afitrahack@gmail.com',
        //         pass: 'akun030396'
        //     }
        // });

        // var mailOptions = {
        //     from: 'afitrahack@gmail.com',
        //     to: 'loeby45@gmail.com',
        //     subject: 'Sending Email using Node.js',
        //     text: 'test yuk'
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
    }



    static create(req, res) {

        Model.create({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }
    static all(req, res) {
        Model.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }


    static login(req, res) {

        if (req.body.email == undefined || req.body.password == undefined) {
            // console.log('ooooo');
            res.json(500, {
                error: "wrong email/password"
            });

        } else {
            Model.findOne({
                    email: req.body.email
                })
                .then(function (user) {
                    // console.log('masok login');

                    let validasi = bcrypt.compareSync(req.body.password, user.password);
                    if (validasi == false) {
                        res.status(400).json({
                            message: 'Wrong Email/Password'
                        })
                    } else {
                        let token = jwt.sign({
                            email: user.email
                        })
                        res.status(200).json({
                            token,
                            role: user.role
                        })
                    }

                })
                .catch(function (err) {
                    res.status(500).json({
                        messege: err.message
                    })
                })
        }
    }
}

module.exports = Controller