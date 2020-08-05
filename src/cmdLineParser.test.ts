import {
    cmdLineParser,
    cmdLineParserRegEx,
    ParserOutput,
} from './cmdLineParser'

describe('cmdLineParser', () => {
    const empty: ParserOutput = {
        bin: '',
        commands: [],
        flags: {},
    }

    it('should parse nothing', () => {
        const inputs = ['', '     ', '-', '--', '-- foo - --bar']

        inputs.forEach((input) => {
            expect(
                cmdLineParser(input),
                JSON.stringify({ input, output: empty, regex: false }),
            ).toEqual(empty)
            expect(
                cmdLineParserRegEx(input),
                JSON.stringify({ input, output: empty, regex: true }),
            ).toEqual(empty)
        })
    })

    it('should parse bin', () => {
        const input = 'node'
        const output = {
            ...empty,
            bin: 'node',
        }

        expect(cmdLineParser(input)).toEqual(output)
        expect(cmdLineParserRegEx(input)).toEqual(output)
    })

    it('should parse commands', () => {
        const pairs: Array<[string, ParserOutput]> = [
            [
                'npm install',
                {
                    ...empty,
                    bin: 'npm',
                    commands: ['install'],
                },
            ],
            [
                'docker init run',
                {
                    ...empty,
                    bin: 'docker',
                    commands: ['init', 'run'],
                },
            ],
        ]

        pairs.forEach(([input, output]) => {
            expect(
                cmdLineParser(input),
                JSON.stringify({ input, output, regex: false }),
            ).toEqual(output)
            expect(
                cmdLineParserRegEx(input),
                JSON.stringify({ input, output, regex: true }),
            ).toEqual(output)
        })
    })

    it('should parse flags', () => {
        const pairs: Array<[string, ParserOutput]> = [
            [
                'jest --silent',
                {
                    ...empty,
                    bin: 'jest',
                    flags: {
                        silent: true,
                    },
                },
            ],
            [
                'tsc -config=tsconfig.json',
                {
                    ...empty,
                    bin: 'tsc',
                    flags: {
                        config: 'tsconfig.json',
                    },
                },
            ],
            [
                `node foo bar -a -b=true --c=false --d="true" --e="false" -f="FooBar" --g="Test 'complex' quotes"`,
                {
                    bin: 'node',
                    commands: ['foo', 'bar'],
                    flags: {
                        a: true,
                        b: true,
                        c: false,
                        d: 'true',
                        e: 'false',
                        f: 'FooBar',
                        g: "Test 'complex' quotes",
                    },
                },
            ],
        ]

        pairs.forEach(([input, output]) => {
            expect(
                cmdLineParser(input),
                JSON.stringify({ input, output, regex: false }),
            ).toEqual(output)
            expect(
                cmdLineParserRegEx(input),
                JSON.stringify({ input, output, regex: true }),
            ).toEqual(output)
        })
    })

    it('should convert flag keys to camel case', () => {
        const pairs: Array<[string, ParserOutput]> = [
            [
                'prettier --end-of-line=CLRF',
                {
                    ...empty,
                    bin: 'prettier',
                    flags: {
                        endOfLine: 'CLRF',
                    },
                },
            ],
        ]

        pairs.forEach(([input, output]) => {
            expect(
                cmdLineParser(input),
                JSON.stringify({ input, output, regex: false }),
            ).toEqual(output)
            expect(
                cmdLineParserRegEx(input),
                JSON.stringify({ input, output, regex: true }),
            ).toEqual(output)
        })
    })

    it('should stop parsing after out of order command', () => {
        const pairs: Array<[string, ParserOutput]> = [
            [
                'node --say=Hello world --ignored=true',
                {
                    ...empty,
                    bin: 'node',
                    flags: {
                        say: 'Hello',
                    },
                },
            ],
        ]

        pairs.forEach(([input, output]) => {
            expect(
                cmdLineParser(input),
                JSON.stringify({ input, output, regex: false }),
            ).toEqual(output)
            expect(
                cmdLineParserRegEx(input),
                JSON.stringify({ input, output, regex: true }),
            ).toEqual(output)
        })
    })
})
