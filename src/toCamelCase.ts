export function toCamelCase(input: string): string {
    return input.split(/[^a-z0-9]/i).reduce((output, word) => {
        if (!word) {
            return output
        }

        word = word.replace(
            /([A-Z])([A-Z]+)/g,
            (_: string, p1: string, p2: string) => `${p1}${p2.toLowerCase()}`,
        )

        if (!output) {
            return `${word[0].toLowerCase()}${word.slice(1)}`
        }

        return `${output}${word[0].toUpperCase()}${word.slice(1)}`
    }, '')
}
