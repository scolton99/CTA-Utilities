module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module',
        'project': 'tsconfig.json'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'ignorePatterns': [
        '**/*.eslintrc.js'
    ],
    'rules': {
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
                readonly: 'generic'
            }
        ],
        '@typescript-eslint/consistent-indexed-object-style': [
            'error',
            'record'
        ],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'angle-bracket',
                objectLiteralTypeAssertions: 'never'
            }
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error'
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error'
        ],
        '@typescript-eslint/explicit-module-boundary-types': [
            'error'
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'comma',
                    requireLast: false
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/member-ordering': [
            'error'
        ],
        '@typescript-eslint/method-signature-style': [
            'error',
            'property'
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['strictCamelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid'
            },
            {
                selector: ['method', 'function'],
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid'
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid'
            },
            {
                selector: 'classProperty',
                modifiers: ['readonly'],
                format: ['UPPER_CASE'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid'
            },
            {
                selector: ['class', 'interface', 'enum'],
                format: ['PascalCase'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid'
            },
            {
                selector: ['variable'],
                modifiers: ['global', 'const'],
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid'
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid'
            }
        ],
        '@typescript-eslint/no-confusing-void-expression': [
            'error'
        ],
        '@typescript-eslint/no-explicit-any': [
            'error'
        ],
        '@typescript-eslint/no-extraneous-class': [
            'warn'
        ],
        '@typescript-eslint/no-for-in-array': [
            'error'
        ],
        '@typescript-eslint/no-implicit-any-catch': [
            'error'
        ],
        '@typescript-eslint/no-invalid-void-type': [
            'error'
        ],
        '@typescript-eslint/no-misused-new': [
            'error'
        ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
            'error'
        ],
        '@typescript-eslint/no-unnecessary-condition': [
            'error'
        ],
        '@typescript-eslint/no-unnecessary-type-assertion': [
            'error'
        ],
        '@typescript-eslint/promise-function-async': [
            'error'
        ],
        '@typescript-eslint/prefer-for-of': [
            'warn'
        ],
        '@typescript-eslint/prefer-function-type': [
            'error'
        ],
        '@typescript-eslint/prefer-includes': [
            'warn'
        ],
        '@typescript-eslint/prefer-readonly': [
            'error'
        ],
        'eqeqeq': [
            'error'
        ],
        'no-constructor-return': [
            'error'
        ],
        'no-empty-function': [
            'warn'
        ],
        'no-unused-expressions': [
            'off'
        ],
        'no-unused-vars': [
            'off'
        ],
        '@typescript-eslint/no-unused-vars': [
            'warn'
        ]
    }
};
