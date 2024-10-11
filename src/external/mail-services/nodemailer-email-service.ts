import { Either, left, right } from "@/shared"
import { MailServiceError } from "@/usecases/errors"
import { EmailOptions, EmailService } from "@/usecases/send-email/ports"
import * as nodemailer from 'nodemailer'

export class NodemailerEmailService implements EmailService {
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
        try {
            const transporter = nodemailer.createTransport({
                host: emailOptions.host,
                port: emailOptions.port,
                auth: {
                    user: emailOptions.username,
                    pass: emailOptions.password
                }
            })
            await transporter.sendMail({
                from: emailOptions.from,
                to: emailOptions.to,
                subject: emailOptions.subject,
                text: emailOptions.text,
                html: emailOptions.html,
                attachments: emailOptions.attachments
            })
        }
        catch (error) {
            return left(new MailServiceError())
        }
        return right(emailOptions)
    }    
}
