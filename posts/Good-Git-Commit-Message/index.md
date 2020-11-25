---
  title: 'Good-Git-Commit-Message'
  date: '2020-08-18T06:36:54Z'
  update: '2020-09-11T10:23:04Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/31'
  tags: ["Git"]
---

## why good commit

git commit 是当次 committing 更改的简短描述。良好的 commit message 不仅仅有利于与和他人合作，而且能很方便的追踪工作记录。

## how to write

commit message 格式

```

    format: [emoji] <type>(scope): <message>

    - emoji：options

    - type: require

    - scope:require

    - message(description):  require


```

### type

- feat: a new feature

- fix: a bug fix

- improvement: an improvement to a current feature

- docs: documention only chnage

- style: everything related to styling

- refactor: a code change that not neither a bug nor add a feat

- test: everything related to testing

- chore: updating build task,package manager config,etc

### scope

当前 commit 影响范围

### descript

当前 commit 简短描述

## emojis type

### one style

- :heavy_plus_sign: when adding a file or implementing a feature

- :hammer: when fixing a bug or issue

- :green_heart: when improving code or comments

- :zap: when improving performance

- :scroll: when updating docs or readme

- :key: when dealing with security

- :repeat: when updating dependencies or data

- :white_check_mark: when a new release was built

- :shirt: when refactoring or removing linter warnings

- :x: when removing code or files

### another style

- :tada: [tada] initial commit

- :rocket: [Add] when implementing a new feature

- :hammer: [Fix] when fixing a bug or issue

- :art: [Refactor] when refactor/improving code

- :construction: [WIP]

- :pencil: [Minor] Some small updates

## gitHook

`package.json`

```json
    "githook": {
      "pre-commit": "lint-staged",
      "commit-msg": "node scripts/verifyCommitMsg.js"
    }
```
`scripts/verifyCommitMsg.js`
```js
const chalk = require('chalk');
// const msgPath = process.env.HUSKY_GIT_PARAMS;
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?!?: .{1,50})/;

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
      chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(menu): handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  See .gitlab/commit-convention.md for more details.\n`)
  );
  process.exit(1);
}

````

## tools

commitizen

- [https://github.com/commitizen/cz-cli](https://github.com/commitizen/cz-cli)

gitmoji-cli

- [https://github.com/carloscuesta/gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)

## reference

- [https://gitmoji.carloscuesta.me/](https://gitmoji.carloscuesta.me/)

- [https://github.com/carloscuesta/gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)

- [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

- [https://udacity.github.io/git-styleguide/](https://udacity.github.io/git-styleguide/)
