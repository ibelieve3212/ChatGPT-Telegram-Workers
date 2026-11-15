export default {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: {
        '^#/(.*)$': '<rootDir>/src/$1',
        // 直接用插件源码, 避免加载 ESM 的 dist (Node 20 的 jest 无法 require ESM)
        '^@chatgpt-telegram-workers/plugins$': '<rootDir>/../plugins/src/index.ts',
    },
};
