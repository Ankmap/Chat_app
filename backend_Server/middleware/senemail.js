/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - senemail.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
/**
 * @Purpose : nodemailer to send mail
**/
var nodemailer = require('nodemailer');

exports.sendEMailFunction = (userEmail,url) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bridgecap0103@gmail.com', // Email Account
                pass: 'Bridge@0103' // Email Account Password
            },
        });
        var mailOptions = {
            from: 'bridgecap0103@gmail.com', // sender address
            to: userEmail,//'bridgecap0103@gmail.com ', // list of receiver
            subject: 'Chat-app password reset link ', // Subject line
            text: 'Please go through the e-mail verifaction link provided in this mail:\n' +url // Text line
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else
                console.log(info);
        });
    } catch (err) {
        console.log(err)
    }
}