import { User } from "@/entities";
import { UseCase } from "@/usecases/ports";
import { EmailOptions, EmailService } from "@/usecases/send-email/ports";
import { Either } from "@/shared";
import { MailServiceError } from "@/usecases/errors";

export class SendEmail implements UseCase {
    constructor(private readonly emailOptions: EmailOptions, private readonly emailService: EmailService) {}

    async perform(user: User): Promise<Either<MailServiceError, EmailOptions>> {
        const greetings = `E aí ${user.name.value}, beleza?`;
        const customizedHtml = greetings + '<br> <br>' + this.emailOptions.html;
        const mailInfo: EmailOptions = {
            host: this.emailOptions.host,
            port: this.emailOptions.port,
            username: this.emailOptions.username,
            password: this.emailOptions.password,
            from: this.emailOptions.from,
            to: `${user.name.value} <${user.email.value}>`,
            subject: this.emailOptions.subject,
            text: this.emailOptions.text,
            html: customizedHtml,
            attachments: this.emailOptions.attachments
        }
        return await this.emailService.send(mailInfo);
    }
} 