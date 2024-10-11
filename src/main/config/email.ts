import { EmailOptions } from "@/usecases/send-email/ports";

const attachments = [{
    filename: 'test.txt',
    path: '../resources/text.txt'
}]

export function getEmailOptions(): EmailOptions {
    const from = 'Lidson Oliveira < lidsonvini2@gmail.com >'
    const to = ''
    const mailOptions: EmailOptions = {
        host: process.env.EMAIL_HOST,
        port: Number.parseInt(process.env.EMAIL_PORT),
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        from: from,
        to: to,
        subject: 'Test subject',
        text: 'Test body',
        html: '<p>Texto da Mensagem</p>',
        attachments: attachments
    }
    return mailOptions
}