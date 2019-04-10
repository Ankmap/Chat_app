var nodemailer = require('nodemailer');

exports.sendEMailFunction = (url, ) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bridgecap0103@gmail.com',
                pass: 'Bridge@0103'
            },
        });
        var mailOptions = {
            from: 'bridgecap0103@gmail.com',// sender address
            to: 'bridgecap0103@gmail.com ',// list of receivers
            subject: 'Chat-app password reset link ',// Subject line
            text: 'Please go through the e-mail verifaction link provided in this mail:\n' + url// plain text body
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