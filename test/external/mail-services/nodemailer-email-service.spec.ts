import { NodemailerEmailService } from '@/external/mail-services'
import { MailServiceError } from '@/usecases/errors'
import { EmailOptions } from '@/usecases/send-email/ports'
import { node } from 'globals'
import { send } from 'process'

const fromName = 'Test'
const fromEmail = 'mail@mail.com'
const toName = 'Test'
const toEmail = 'anymail@mail.com'
const subject = 'Teste subject'
const emailBody = 'Teste body'
const emailBodyHtml = '<p>Teste body</p>'
const attachment = [{
    filename: '../resources/text.txt',
    contentType: 'text/plain',
}]

const mailOptions: EmailOptions = {
    host: 'teste',
    port: 2525,
    username: 'username',
    password: 'password',
    from: `${fromName} <${fromEmail}>`,
    to: `${toName} <${toEmail}>`,
    subject: subject,
    text: emailBody,
    html: emailBodyHtml,
    attachments: attachment,
}

jest.mock('nodemailer')
const nodemailer = require('nodemailer')
const sendMailMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

describe('Send email use case', () => {
    beforeEach(() => {
        sendMailMock.mockClear()
        nodemailer.createTransport.mockClear()
    })

    test('Should send email', async () => {    
        const nodemailer = new NodemailerEmailService()
        const result = await nodemailer.send(mailOptions)
        expect(result.value).toEqual(mailOptions)
    })

    test('Should return MailServiceError if email service fails', async () => {
        sendMailMock.mockImplementationOnce(() => { throw new Error() })        
        const nodemailer = new NodemailerEmailService()        
        const result = await nodemailer.send(mailOptions)
        expect(result.value).toBeInstanceOf(MailServiceError)
    })
})