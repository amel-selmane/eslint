---
title: Configure Plugins
eleventyNavigation:
    key: configure plugins
    parent: configure
    title: Configure Plugins
    order: 5

---

::: tip
This page explains how to configure plugins using the flat config format. For the deprecated eslintrc format, [see the deprecated documentation](plugins-deprecated).
:::

You can extend ESLint with plugins in a variety of different ways. Plugins can include:

* Custom rules to validate if your code meets a certain expectation, and what to do if it does not meet that expectation.
* Custom configurations.
* Custom environments.
* Custom processors to extract JavaScript code from other kinds of files or preprocess code before linting.

## Configure Plugins

ESLint supports the use of third-party plugins. Plugins are simply objects that conform to a specific interface that ESLint recognizes.

To configure plugins inside of a configuration file, use the `plugins` key, which contains an object with properties representing plugin namespaces and values equal to the plugin object.

```js
// eslint.config.js
import example from "eslint-plugin-example";

export default [
    {
        plugins: {
            example
        },
        rules: {
            "example/rule1": "warn"
        }
    }
];
```

::: tip
When creating a namespace for a plugin, the convention is to use the npm package name without the `eslint-plugin-` prefix. In the preceding example, `eslint-plugin-example` is assigned a namespace of `example`.
:::

### Specify a Processor

Plugins may provide processors. Processors can extract JavaScript code from other kinds of files, then let ESLint lint the JavaScript code. Alternatively, processors can convert JavaScript code during preprocessing.

To specify processors in a configuration file, use the `processor` key and assign the name of processor in the format `namespace/processor-name`. For example, the following enables the processor `a-processor` that the plugin `a-plugin` provided:

```js
// eslint.config.js
import example from "eslint-plugin-example";

export default [
    {
        plugins: {
            example
        },
        processor: "example/processor-name"
    }
];
```

To specify processors for specific kinds of files, use a separate config object with the `processor` key. For example, the following uses the processor from `eslint-plugin-markdown` for `*.md` files.

```js
// eslint.config.js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown"
    }
];
```

Processors may make named code blocks such as `0.js` and `1.js`. ESLint handles such a named code block as a child file of the original file. You can specify additional configurations for named code blocks with additional config objects. For example, the following disables the `strict` rule for the named code blocks which end with `.js` in markdown files.

```js
// eslint.config.js
import markdown from "eslint-plugin-markdown";

export default [

    // applies to all JavaScript files
    {
        rules: {
            strict: "error"
        }
    },

    // applies to Markdown files
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown"
    },

    // applies only to JavaScript blocks inside of Markdown files
    {
        files: ["**/*.md/*.js"],
        rules: {
            strict: "off"
        }
    }
];
```

ESLint only lints named code blocks when they are JavaScript files or if they match a `files` entry in a config object. Be sure to add a config object with a matching `files` entry if you want to lint non-JavaScript named code blocks.
