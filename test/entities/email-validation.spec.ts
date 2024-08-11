import { Email } from "@/entities"

describe('Email validation', () => {
    test('should not accept null strings', () => {
        const email = null
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty strings', () => {
        const email = ''
        expect(Email.validate(email)).toBeFalsy()
    })
 
    test('should accept valid email', () => {
        const email = 'lidson@oriontec.com.br'
        expect(Email.validate(email)).toBeTruthy()
    })

    test('should accept strings not larger than 320 characters', () => {
        const email = 'l'.repeat(63) + '@' + 'd'.repeat(63) + '.' + 'd'.repeat(63) + '.' + 'd'.repeat(63) + '.' + 'd'.repeat(63)
        expect(Email.validate(email)).toBeTruthy()
    })

    test('should not accept strings larger than 320 characters', () => {
        const email = 'l'.repeat(65) + '@' + 'd'.repeat(63) + '.' + 'd'.repeat(63) + '.' + 'd'.repeat(63) + '.' + 'd'.repeat(63)
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept local part larger than 64 characters', () => {
        const email = 'l'.repeat(65) + '@mail.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept domain part larger than 256 characters', () => {
        const email = 'local@' + 'd'.repeat(257) + '.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty local part', () => {
        const email = '@mail.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty domain part', () => {
        const email = 'lidson@'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept domain with a part larger than 63 characters', () => {
        const email = 'lidson@' + 'd'.repeat(64) + '.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept local part with an invalid char', () => {
        const email = 'lid space@mail.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept local part with two dots', () => {
        const email = 'lid..dots@mail.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept local part with ending dot', () => {
        const email = 'lid.@mail.com'
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept email with two @', () => {
        const email = 'lid@lid@mail.com'
        expect(Email.validate(email)).toBeFalsy()
    })
})