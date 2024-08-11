import { User } from "../../src/entities"

describe('User domain entity', () => {
    test('should not create user with invalid e-mail adress', () => {
        const invalidEmail = 'invalid_email'
        const error = User.create({ name: 'name', email: invalidEmail}).value as Error 
        expect(error.name).toEqual('InvalidEmailError')
        expect(error.message).toEqual('Email inválido: ' + invalidEmail)
    }) 

    test('should not create user with invalid name(too few characters)', () => {
        const name = 'O           '
        const error = User.create({ name: name, email: 'teste@gmail.com' }).value as Error
        expect(error.name).toEqual('InvalidNameError')
        expect(error.message).toEqual('Nome inválido: ' + name)
    })

    test('should not create user with invalid name(too many characters)', () => {
        const name = 'O'.repeat(257)
        const error = User.create({ name: name, email: 'teste@gmail.com' }).value as Error
        expect(error.name).toEqual('InvalidNameError')
        expect(error.message).toEqual('Nome inválido: ' + name)
    })

    test('should create user with valid name and email', () => {
        const validName = 'Lidson Oliveira'
        const validEmail = 'lidson@oriontec.com.br'
        const user: User = User.create({ name: validName, email: validEmail }).value as User
        expect(user.name.value).toEqual(validName)
        expect(user.email.value).toEqual(validEmail)
    })
})

