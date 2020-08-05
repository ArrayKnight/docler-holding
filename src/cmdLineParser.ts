export interface ParserOutput {
    bin: string
    commands: string[]
    flags: Record<string, boolean | string>
}

export function cmdLineParser(input: string): ParserOutput {
    const output: ParserOutput = {
        bin: '',
        commands: [],
        flags: {},
    }

    // TODO

    return output
}
