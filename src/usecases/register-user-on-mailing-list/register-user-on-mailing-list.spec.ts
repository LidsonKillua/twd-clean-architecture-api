import { UserData } from "../../entities/user-data"
import { RegisterUserOnMailingList } from "../register-user-on-mailing-list"
import { UserRepository } from "./ports/user-repository"
import { InMemoryUserRepository } from "./repository/in-memory-user-repository"

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
})