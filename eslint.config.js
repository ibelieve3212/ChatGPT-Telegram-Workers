import antfu, { imports, javascript, jsdoc, node, typescript } from '@antfu/eslint-config';

/** @type {import('eslint-flat-config-utils').FlatConfigComposer} */
const config = antfu(
    {
        type: 'app',
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
            // @ts-ignore
            braceStyle: '1tbs',
        },
        markdown: false,
        typescript: true,
        ignores: [
            '.github/**',
            '.idea/**',
            '.vscode/**',
            '.wrangler/**',
            'dist/**',
            'node_modules/**',
            // 生成的数据文件(番号 -> ed2k 表, 1641 条), 由脚本从上游 JSON 生成,
            // 不进代码风格检查: 它是一大块数据, 按代码规则格式化只会让 diff 噪音变大。
            'packages/lib/core/src/telegram/command/av/ltx-data.ts',
        ],
    },
    imports,
    jsdoc,
    typescript,
    javascript,
    node,
    {
        rules: {
            'jsdoc/no-undefined-types': 'off',
            'jsdoc/require-returns-description': 'off',
            'jsdoc/require-property-description': 'off',
            'jsdoc/require-param-description': 'off',
            'node/prefer-global/process': 'off',
            'node/prefer-global/buffer': 'off',
            'eslint-comments/no-unlimited-disable': 'off',
            'padding-line-between-statements': 'off',
            'no-console': 'off',
            'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        },
    },
);

export default config;
