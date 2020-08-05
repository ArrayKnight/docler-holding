module.exports = {
    moduleFileExtensions: [
        'web.js',
        'js',
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'json',
        'web.jsx',
        'jsx',
        'node',
    ],
    setupFilesAfterEnv: ['jest-expect-message'],
    testEnvironment: 'jest-environment-jsdom-fourteen',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.[jt]sx?$'],
}
