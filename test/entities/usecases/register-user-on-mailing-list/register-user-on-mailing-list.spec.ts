import { User, UserData } from "@/entities"
import { RegisterUserOnMailingList } from "@/usecases/register-user-on-mailing-list"
import { UserRepository } from "@/usecases/register-user-on-mailing-list/ports"
import { InMemoryUserRepository } from "@/usecases/register-user-on-mailing-list/repository"

describe('registrar usuário na lista de emails use case', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

  test('should add user with complete data to mailing list', async () => {
    const name = 'any_name'
    const email = 'any@email.com'
    const user = User.create({ name, email }).value as User
    const response = await usecase.perform(user)
    const addeduser = repo.findUserByEmail(email)
    expect((await addeduser).name).toBe('any_name')
    expect(response.name).toBe('any_name')
  })
})