import { toCamelCase } from './toCamelCase'

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

    input = input.trim()

    if (!input) {
        return output
    }

    let i = 0
    let key: string[] = []
    let value: string[] = []
    let parsingFlags = false
    let flagStarted = false
    let parsingValue = false
    let quoteChar = ''

    while (i <= input.length) {
        const prevChar = input[i - 1] || ''
        const char = input[i] || ''
        const nextChar = input[i + 1] || ''
        const isEndOfLine = i === input.length
        const keyContinues = isSeparator(char) && isAlphaNumeric(nextChar)

        if (!output.bin) {
            if (!key.length && !isAlphaNumeric(char)) {
                // throw `Malformed bin; errored at index: ${i}; received input: ${input}`

                break
            }

            if (key.length && (isEndOfLine || isSpace(char))) {
                output.bin = key.join('')
                key = []
            } else if (isAlphaNumeric(char) || keyContinues) {
                key.push(char)
            } else {
                // throw `Malformed bin; errored at index: ${i}; received input: ${input}`

                break
            }
        } else {
            if (
                isSpace(prevChar) &&
                isDash(char) &&
                (isDash(nextChar) || isAlphaNumeric(nextChar))
            ) {
                parsingFlags = true
                flagStarted = true
                i += isDash(nextChar) ? 2 : 1
                continue
            }

            if (!parsingFlags) {
                if (key.length && (isEndOfLine || isSpace(char))) {
                    output.commands.push(key.join(''))
                    key = []
                } else if (isAlphaNumeric(char) || keyContinues) {
                    key.push(char)
                } else {
                    // throw `Malformed command; errored at index: ${i}; received input: ${input}`

                    break
                }
            } else {
                if (!flagStarted) {
                    break
                }

                if (isEquals(char) || (quoteChar && char === quoteChar)) {
                    parsingValue = true
                    i++
                    continue
                }

                if (!parsingValue) {
                    if (key.length && (isEndOfLine || isSpace(char))) {
                        output.flags[toCamelCase(key.join(''))] = true
                        key = []
                        flagStarted = false
                    } else if (isAlphaNumeric(char) || keyContinues) {
                        key.push(char)
                    } else {
                        // throw `Malformed flag; errored at index: ${i}; received input: ${input}`

                        break
                    }
                } else {
                    if (
                        value.length &&
                        (isEndOfLine || isSpace(char)) &&
                        (!quoteChar || prevChar === quoteChar)
                    ) {
                        const val = value.join('')
                        const isTrue = val === 'true'
                        const isFalse = val === 'false'

                        output.flags[toCamelCase(key.join(''))] = quoteChar
                            ? val
                            : isTrue
                            ? true
                            : isFalse
                            ? false
                            : val
                        key = []
                        value = []
                        flagStarted = false
                        parsingValue = false
                        quoteChar = ''
                    } else if (
                        !quoteChar &&
                        isQuote(char) &&
                        isEquals(prevChar)
                    ) {
                        quoteChar = char
                    } else if (
                        (!quoteChar && !isSpace(char)) ||
                        (quoteChar && char !== quoteChar)
                    ) {
                        value.push(char)
                    } else {
                        // throw `Malformed flag; errored at index: ${i}; received input: ${input}`

                        break
                    }
                }
            }
        }

        i++
    }

    return output
}

export function isAlphaNumeric(input: string): boolean {
    return isLetter(input) || isNumber(input)
}

export function isDash(input: string): boolean {
    return input === '-'
}

export function isEquals(input: string): boolean {
    return input === '='
}

export function isLetter(input: string): boolean {
    const charCode = input.charCodeAt(0)

    return (
        (charCode >= 65 && charCode <= 90) || // A-Z
        (charCode >= 97 && charCode <= 122) // a-z
    )
}

export function isNumber(input: string): boolean {
    const charCode = input.charCodeAt(0)

    return charCode >= 48 && charCode <= 57 // 0-9
}

export function isQuote(input: string): boolean {
    return input === '"' || input === "'"
}

export function isSeparator(input: string): boolean {
    return isDash(input) || isUnderscore(input)
}

export function isSpace(input: string): boolean {
    return input === ' '
}

export function isUnderscore(input: string): boolean {
    return input === '_'
}
