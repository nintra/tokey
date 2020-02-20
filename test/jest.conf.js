const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname, '../'),
    moduleFileExtensions: [
        'js',
        'json'
    ],
    testURL: 'http://localhost/',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.git/'
    ],
    watchPathIgnorePatterns: [
        '/node_modules/',
        '/.git/'
    ],
    coverageDirectory: '/test/coverage/',
}
