import { left } from "../shared/either"
import { InvalidEmailError } from "./errors/invalid-email-error"
import { InvalidNameError } from "./errors/invalid-name-error"
import { User } from "./user"

describe('User domain entity', () => {
    test('should not create user with invalid e-mail adress', () => {
        const invalidEmail = 'invalid_email'
        const error = User.create({ name: 'name', email: invalidEmail})
        expect(error).toEqual(left(new InvalidEmailError()))
    }) 

    test('should not create user with invalid name(too few characters)', () => {
        const name = 'O           '
        const error = User.create({ name: name, email: 'teste@gmail.com' })
        expect(error).toEqual(left(new InvalidNameError()))
    })

    test('should not create user with invalid name(too many characters)', () => {
        const name = 'O'.repeat(257)
        const error = User.create({ name: name, email: 'teste@gmail.com' })
        expect(error).toEqual(left(new InvalidNameError()))
    })

    test('should create user with valid name and email', () => {
        const validName = 'Lidson Oliveira'
        const validEmail = 'lidson@oriontec.com.br'
        const user: User = User.create({ name: validName, email: validEmail }).value as User
        expect(user.name.value).toEqual(validName)
        expect(user.email.value).toEqual(validEmail)
    })
})

