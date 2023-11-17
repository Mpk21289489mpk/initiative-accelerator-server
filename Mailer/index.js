"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendServiceEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const serviceMailTransporter = nodemailer_1.default.createTransport({
    service: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SERVICE_EMAIL,
        pass: process.env.SERVICE_EMAIL_PASS
    }
});
class SendServiceEmail {
    static sendText(params) {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: process.env.SERVICE_EMAIL,
                priority: "high",
                to: params.recipient,
                subject: params.subject,
                text: `${params.text}\n\n\n\nЭто сообщение является системным. Пожалуйста, не отвечайте на него.`
            };
            serviceMailTransporter.sendMail(mailOptions, function (err, info) {
                   if(err)
                     console.log(err)
                   else
                     console.log(info);
            }).then((result) => { resolve(result); });
        });
    }
}
exports.SendServiceEmail = SendServiceEmail;
