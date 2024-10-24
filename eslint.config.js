import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

const jsConfig = {
    files: ['**/*.js'],
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.nodeBuiltin,
        },
    },
    rules: {
        ...js.configs.recommended.rules,
    },
};

const stylisticConfig = stylistic.configs.customize({
    arrowParens: true,
    braceStyle: '1tbs',
    indent: 4,
    jsx: false,
    semi: true,
});

export default [
    jsConfig,
    stylisticConfig,
];
