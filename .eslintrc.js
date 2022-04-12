module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: ['airbnb-typescript', 'react-app', 'prettier'],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    files: ['*.ts', '*.tsx'],
    parserOptions: {
        ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
    },
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx'],
    //         parserOptions: {
    //             ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    //             sourceType: 'module', // Allows for the use of imports
    //             ecmaFeatures: {
    //                 jsx: true, // Allows for the parsing of JSX
    //             },
    //             // this setting is required to use rules that require type information
    //             project: './tsconfig.json',
    //         },
    //         rules: {
    //             '@typescript-eslint/prefer-nullish-coalescing': 'error',
    //         },
    //     },
    // ],
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};