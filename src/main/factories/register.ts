import { RegisterAndSendEmailController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { SendEmail } from '@/usecases/send-email'
import { NodemailerEmailService } from '@/external/mail-services'
import { getEmailOptions } from '@/main/config'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email'

export const makeRegisterAndSendEmailController = (): RegisterAndSendEmailController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(mongodbUserRepository)
  const emailService = new NodemailerEmailService()
  const sendEmailUseCase = new SendEmail(getEmailOptions(), emailService)
  const registerAndSendEmailUseCase = new RegisterAndSendEmail(registerUserOnMailingListUseCase, sendEmailUseCase)
  const registerUserController = new RegisterAndSendEmailController(registerAndSendEmailUseCase)
  return registerUserController
}