// Docs: https://prettier.io/docs/en/configuration.html

/** @type {import("prettier").Options} */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    useTabs: true,
    bracketSpacing: true,
    arrowParens: "always",
    paddedBlocks: "always",
    printWidth: 70,
    singleAttributePerLine: true,
    proseWrap: "always",
};

module.exports = config;