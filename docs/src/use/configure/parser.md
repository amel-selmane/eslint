---
title: Configure a Parser
eleventyNavigation:
    key: configure parser
    parent: configure
    title: Configure a Parser
    order: 6
---

::: tip
This page explains how to configure parsers using the flat config format. For the deprecated eslintrc format, [see the deprecated documentation](parsers-deprecated).
:::

You can use custom parsers to convert JavaScript code into an abstract syntax tree for ESLint to evaluate. You might want to add a custom parser if your code isn't compatible with ESLint's default parser, Espree.

## Configure a Custom Parser

By default, ESLint uses [Espree](https://github.com/eslint/espree) as its parser. You can optionally specify that a different parser should be used in your configuration file if the parser meets the following requirements:

1. It must be a Node module loadable from the config file where the parser is used. Usually, this means you should install the parser package separately using npm.
1. It must conform to the [parser interface](../../extend/custom-parsers).

Note that even with these compatibilities, there are no guarantees that an external parser works correctly with ESLint. ESLint does not fix bugs related to incompatibilities with other parsers.

To indicate the npm module to use as your parser, specify it using the `languageOptions.parser` key in your `.eslint.config.js` file. For example, the following specifies to use the [Babel ESLint parser](https://npmjs.com/package/@babel/eslint-parser) instead of Espree:

```js
// eslint.config.js
import babelParser from "@babel/eslint-parser";

export default [
    {
        languageOptions: {
            parser: babelParser
        }
    }
];
```

The following parsers are known to be compatible with ESLint:

* [Esprima](https://www.npmjs.com/package/esprima)
* [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - A wrapper around the [Babel](https://babeljs.io) parser that makes it compatible with ESLint.
* [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - A parser that converts TypeScript into an ESTree-compatible form so it can be used in ESLint.

## Configure Parser Options

Parsers may accept options to alter the way they behave. The `languageOptions.parserOptions` is used to pass options directly to parsers. These options are always parser-specific, so you'll need to check the documentation of the parser you're using for available options. Here's an example of setting parser options for the Babel ESLint parser:

```js
// eslint.config.js
import babelParser from "@babel/eslint-parser";

export default [
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                  babelrc: false,
                  configFile: false,
                  presets: ["@babel/preset-env"],
                },
            }
        }
    }
];
```

::: tip
In addition to the options specified in `languageOptions.parserOptions`, ESLint also passes `ecmaVersion` and `sourceType` to all parsers. This allows custom parsers to understand the context in which ESLint is evaluating JavaScript code.
:::
