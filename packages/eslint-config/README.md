# @nutol/eslint-config

Shared ESLint config to enforce a consistent code style for LoopBack development

## Installation

```shell
npm install --save @nutol/eslint-config

npm install --save-dev \
eslint \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
eslint-config-prettier \
eslint-plugin-eslint-plugin \
eslint-plugin-mocha
```

## Basic Use

Add `.eslintrc.json` file to your project, for example:

```json
{
  "extends": "@nutol/eslint-config"
}
```

**NOTE**:

Due to
[the limitation of how ESLint plugins are loaded](https://github.com/eslint/rfcs/tree/master/designs/2018-simplified-package-loading),
the [peerDependencies](package.json) of this module should be added to `devDependencies` of your `package.json`.

## Contributions

- [Guidelines](https://github.com/nutoljs/nutol/blob/master/docs/CONTRIBUTING.md)
- [Join the team](https://github.com/nutoljs/nutol/issues/110)

## Contributors

See [all contributors](https://github.com/nutoljs/nutol/graphs/contributors).

## License

MIT
