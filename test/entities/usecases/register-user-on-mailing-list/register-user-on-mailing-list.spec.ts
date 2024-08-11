import { UserData } from "../../../../src/entities"
import { RegisterUserOnMailingList } from "../../../../src/usecases/register-user-on-mailing-list"
import { UserRepository } from "../../../../src/usecases/register-user-on-mailing-list/ports"
import { InMemoryUserRepository } from "./repository"

describe('registrar usuário na lista de emails use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.RegisterUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidname = ''
    const email = 'any@email.com'
    const response = await usecase.RegisterUserOnMailingList({ name: invalidname, email })
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull
    expect(response.value.name).toEqual('InvalidNameError')
  })

  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = await usecase.RegisterUserOnMailingList({ name, email: invalidemail })
    const user = await repo.findUserByEmail(invalidemail)
    expect(user).toBeNull
    expect(response.value.name).toEqual('InvalidEmailError')
  })
})