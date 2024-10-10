import { User, UserData } from "@/entities"
import { Either, right } from "@/shared"
import { MailServiceError } from "@/usecases/errors"
import { RegisterAndSendEmail } from "@/usecases/register-and-send-email"
import { RegisterUserOnMailingList } from "@/usecases/register-user-on-mailing-list"
import { UserRepository } from "@/usecases/register-user-on-mailing-list/ports"
import { InMemoryUserRepository } from "@/usecases/register-user-on-mailing-list/repository"
import { SendEmail } from "@/usecases/send-email"
import { EmailOptions, EmailService } from "@/usecases/send-email/ports"

describe('Register and send email use case', () => {
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
    
    class MailServiceMock implements EmailService {
        public timesSendWasCalled = 0
        async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
            this.timesSendWasCalled++
            return right(emailOptions)
        }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const resgisterUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const mailServiceMock = new MailServiceMock()
    const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)
    const registerAndSendEmailUseCase: RegisterAndSendEmail = 
        new RegisterAndSendEmail(resgisterUseCase, sendEmailUseCase)

    test('should add user with complete data to mailing list', async () => {
        const name = 'any_name'
        const email = 'any@email.com'
        const response: User = (await registerAndSendEmailUseCase.perform({ name, email })).value as User
        const user = repo.findUserByEmail(email)
        expect((await user).name).toBe('any_name')
        expect(response.name.value).toBe('any_name')
        expect(mailServiceMock.timesSendWasCalled).toEqual(1)
    })

    test('should not add user with invalid email to mailing list', async () => {
        const invalidname = ''
        const email = 'any@email.com'
        const response = await registerAndSendEmailUseCase.perform({ name: invalidname, email })
        const user = await repo.findUserByEmail(email)
        expect(user).toBeNull
        expect(response.value.name).toEqual('InvalidNameError')
    })

    test('should not add user with invalid name to mailing list', async () => {
        const name = 'any_name'
        const invalidemail = 'invalid_email'
        const response = await registerAndSendEmailUseCase.perform({ name, email: invalidemail })
        const user = await repo.findUserByEmail(invalidemail)
        expect(user).toBeNull
        expect(response.value.name).toEqual('InvalidEmailError')
    })
})