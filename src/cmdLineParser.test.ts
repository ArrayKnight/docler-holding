import { cmdLineParser, ParserOutput } from './cmdLineParser'

describe('cmdLineParser', () => {
    const output: ParserOutput = {
        bin: '',
        commands: [],
        flags: {},
    }

    it('should parse nothing', () => {
        const inputs = ['', '     ', '-', '--', '-- foo - --bar']

        inputs.forEach((input) => {
            expect(cmdLineParser(input), JSON.stringify({ input })).toEqual(
                output,
            )
        })
    })

    it('should parse bin', () => {
        expect(cmdLineParser('node')).toEqual({
            ...output,
            bin: 'node',
        })
    })

    it('should parse commands', () => {
        expect(cmdLineParser('npm install')).toEqual({
            ...output,
            bin: 'npm',
            commands: ['install'],
        })

        expect(cmdLineParser('docker init run')).toEqual({
            ...output,
            bin: 'docker',
            commands: ['init', 'run'],
        })
    })

    it('should parse flags', () => {
        expect(cmdLineParser('jest --silent')).toEqual({
            ...output,
            bin: 'jest',
            flags: {
                silent: true,
            },
        })

        expect(cmdLineParser('tsc -config=tsconfig.json')).toEqual({
            ...output,
            bin: 'tsc',
            flags: {
                config: 'tsconfig.json',
            },
        })

        expect(
            cmdLineParser(
                `node foo bar -a -b=true --c=false --d="true" --e="false" -f="FooBar" --g="Test 'complex' quotes"`,
            ),
        ).toEqual({
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
        })
    })

    it('should convert flag keys to camel case', () => {
        expect(cmdLineParser('prettier --end-of-line=CLRF')).toEqual({
            ...output,
            bin: 'prettier',
            flags: {
                endOfLine: 'CLRF',
            },
        })
    })

    it('should stop parsing after out of order command', () => {
        expect(cmdLineParser('node --say=Hello world --ignored=true')).toEqual({
            ...output,
            bin: 'node',
            flags: {
                say: 'Hello',
            },
        })
    })
})
