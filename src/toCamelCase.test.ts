import { toCamelCase } from './toCamelCase'

describe('toCamelCase', () => {
    it('should convert string to camel case', () => {
        const pairs = [
            ['', ''],
            [' ', ''],
            [' foo', 'foo'],
            [' foo ', 'foo'],
            ['foo', 'foo'],
            ['Foo', 'foo'],
            ['FooBar', 'fooBar'],
            ['Foo-Bar', 'fooBar'],
            ['foo bar', 'fooBar'],
            [' fooBar', 'fooBar'],
            [' foo bar', 'fooBar'],
            [' foo-bar Baz', 'fooBarBaz'],
            ['-foo-bar-baz', 'fooBarBaz'],
            ['FOOBAR', 'foobar'],
            ['fooID', 'fooId'],
            ['fooBAR', 'fooBar'],
        ]

        pairs.forEach(([input, output]) => {
            expect(
                toCamelCase(input),
                JSON.stringify({ input, output }),
            ).toEqual(output)
        })
    })
})
