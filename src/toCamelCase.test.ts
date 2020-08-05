import { toCamelCase } from './toCamelCase'

describe('toCamelCase', () => {
    it('should convert string to camel case', () => {
        const pairs = [
            ['foo', 'foo'],
            ['Foo', 'foo'],
            ['FooBar', 'fooBar'],
            ['Foo-Bar', 'fooBar'],
            ['foo bar', 'fooBar'],
        ]

        pairs.forEach(([input, output]) => {
            expect(
                toCamelCase(input),
                JSON.stringify({ input, output }),
            ).toEqual(output)
        })
    })
})
