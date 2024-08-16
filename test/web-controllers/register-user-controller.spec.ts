import { UserData } from "@/entities"
import { RegisterUserOnMailingList } from "@/usecases/register-user-on-mailing-list"
import { UserRepository } from "@/usecases/register-user-on-mailing-list/ports"
import { RegisterUserController } from "../../src/web-controllers/register-user-controller"
import { InMemoryUserRepository } from "../../src/usecases/register-user-on-mailing-list/repository"
import { HttpRequest, HttpResponse } from "../../src/web-controllers/ports"
import { InvalidEmailError, InvalidNameError } from "@/entities/errors"
import { MissingParamError } from "@/web-controllers/errors"
import { UseCase } from "@/usecases/ports"

describe('Register user web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterUserController = new RegisterUserController(usecase)

  class ErrorThrowingUseCaseStub implements UseCase {
    async perform(request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
        body: {
            name: 'Any Name',
            email: 'any@mail.com'
        }
    }

    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request contains invalid name', async () => {
    const requestInvalidName: HttpRequest = {
        body: {
            name: 'a',
            email: 'any@mail.com'
        }
    }

    const response: HttpResponse = await controller.handle(requestInvalidName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid email', async () => {
    const requestInvalidEmail: HttpRequest = {
        body: {
            name: 'Lidson Oliveira',
            email: 'invalid_email'
        }
    }

    const response: HttpResponse = await controller.handle(requestInvalidEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const requestMissingName: HttpRequest = {
        body: {
            email: 'teste@gmail.com'
        }
    }

    const response: HttpResponse = await controller.handle(requestMissingName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing email', async () => {
    const requestMissingEmail: HttpRequest = {
        body: {
            name: 'Lidson Oliveira'
        }
    }

    const response: HttpResponse = await controller.handle(requestMissingEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('should return status code 400 when request is missing name and email', async () => {
    const requestMissingNameAndEmail: HttpRequest = {
        body: {}
    }

    const response: HttpResponse = await controller.handle(requestMissingNameAndEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
        body: {
            name: 'Any Name',
            email: 'any@mail.com'
        }
    }

    const controller: RegisterUserController = new RegisterUserController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})