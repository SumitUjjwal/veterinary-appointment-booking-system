const nodemailer = require('nodemailer');


// exports.contact = function(req, res){
//     var name = req.body.name;
//     var from = req.body.from;
//     var message = req.body.message;
//     var to = '*******@gmail.com';
//     var smtpTransport = nodemailer.createTransport("SMTP",{
//         service: "Gmail",
//         auth: {
//             user: "ssaraswat2002@gmail.com",
//             pass: 'shivasara5665'
//         }
//     });
//     var mailOptions = {
//         from: 'shivamsharmaji04@gmail.com',
//         to: "ssaraswat2002@gmail.com", 
//         subject: "Shiva" +' | new message !',
//         text: message
//     }
    // smtpTransport.sendMail(mailOptions, function(error, response){
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log(response);
    //         res.redirect('/');
    //     }
    // });
// }

var smtpTransport = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 587,
    secure: true,
    debug:true,
    logger: true,
    auth: {
        user: "ssaraswat2002@gmail.com",
        pass: 'shivasara5665'
    },
    tls:{
        rejectUnauthorized: false
    }
});
var mailOptions = {
    to: 'shivamsharmaji04@gmail.com',
    from: "ssaraswat2002@gmail.com", 
    subject: "Shiva" +' | new message !',
    text: "message"
}

smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log(response);
        res.redirect('/');
    }
});

// smtpTransport.sendMail({
//     to:"ssaraswat2002@gmail.com",
//     from:"shivamsharmaji04@gmail.com",
//     subject: 'Hello',
//     text: 'Hello world!'

// }).then(()=>{
//     console.log('Email sent!')
// }).catch((err)=>{
//     console.log(err)})

// const transporter = nodemailer.createTransport({
//     host: 'Gmail.com',
//     port: 587,
//     auth: {
//         user: 'shivamsharmaji04@gmail.com',
//         pass: 'shivasara5665'
//     },
//     tls:{
//         rejectUnauthorized: false
//     }
// });


// transporter.sendMail({
//     to:"shivamsharmaji04@gmail.com",
//     from:"ssaraswat2002@gmail.com",
//     subject: 'Hello',
//     text: 'Hello world!'

// }).then(()=>{
//     console.log('Email sent!')
// }).catch((err)=>{
//     console.log(err)})