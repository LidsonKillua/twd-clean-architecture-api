import { MongoHelper } from "@/external/repositories/mongodb/helper";
import { MongodbUserRepository } from "@/external/repositories/mongodb";


describe('MongoDB User Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        await MongoHelper.clearCollection('users')
    })

    test('when user is added, it should exist', async () => {
        const sut = new MongodbUserRepository()
        const user = {
            name: 'any_name',
            email: 'any@email.com'
        }
        await sut.add(user)
        expect(await sut.exists(user)).toBeTruthy()
    })    

    test('find all users in collection', async () => {
        const sut = new MongodbUserRepository()
        const user = {
            name: 'any_name',
            email: 'any@mail.com'  
        }
        const user2 = {
            name: 'second_name',
            email: 'any2@mail.com'
        }
        await sut.add(user)
        await sut.add(user2)
        const users = await sut.findAllUsers()
        expect(users).toHaveLength(2)
        expect(users[0].name).toBe('any_name')
        expect(users[1].email).toBe('any2@mail.com')
    })
})