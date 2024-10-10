import { Either, left, Left, right, Right} from "@/shared"
import { MailServiceError } from "@/usecases/errors/mail-service-error"
import { EmailOptions, EmailService } from "@/usecases/send-email/ports"
import { SendEmail } from "@/usecases/send-email"

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

class MailServiceStub implements EmailService {
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
        return right(emailOptions)
    }
}

class MailServiceErrorStub implements EmailService {
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
        return left(new MailServiceError())
    }
}

describe('Send email use case', () => {
    test('Should send email', async () => {
        const mailServiceStub = new MailServiceStub()
        const sut = new SendEmail(mailOptions, mailServiceStub)
        const response = await sut.perform({ name: toName, email: toEmail })
        expect(response).toBeInstanceOf(Right)
    })

    test('Should return Error if user data is invalid', async () => {
        const mailServiceStub = new MailServiceStub()
        const sut = new SendEmail(mailOptions, mailServiceStub)
        const response = await sut.perform({ name: toName, email: 'inválido' })
        expect(response).toBeInstanceOf(Left)
    })

    test('Should return MailServiceError if email service fails', async () => {
        const mailServiceStub = new MailServiceErrorStub()
        const sut = new SendEmail(mailOptions, mailServiceStub)
        const response = await sut.perform({ name: toName, email: toEmail })
        expect(response.value).toBeInstanceOf(MailServiceError)
    })
})