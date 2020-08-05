# Docler Holding Coding Challenge

### `npm install && npm test`

## Instructions

-   Create a command line parser that outputs a consistent model: capturing the bin, commands, and flags
-   The bin will be the first term in the input string
-   The commands (if there are any) will be space separated terms coming directly after the bin
-   The flags (if there are any) will be space separated terms, prefixed with one or two dashes, and will optionally have a value assigned
-   If a command comes after a flag, stop parsing and ignore the command and following flags
-   Bonus: handle flag values that have been wrapped in quotes

### Application improvements

Given more time, there are several updates/changes that should be made to increase flexibility and extensibility:

-   There are likely still more optimizations to be made
-   There are likely some flag values that would cause issue, such as having an equals sign
-   It might also make sense to break up the body of the cmdLineParser function into more discreet sections

### Notes

My initial version, which was submitted in the timed quiz, took the approach of using RegEx to pattern match the different terms to be parsed. I didn't end up having time to handle the optional quotes around flag values. I just wanted to show a different approach for fun.

The instructions are all pulled from memory, so I might not be 100% accurate to the original quiz assignment.
