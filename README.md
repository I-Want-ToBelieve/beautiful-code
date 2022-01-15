## Requirements

- `node` version >=16.13.2
- [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) have been installed in chrome broswer
- **windows os only:** [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) have been installed
- **mac os only:** Command Line Tools (CLT) for Xcode: xcode-select --install, [developer.apple.com/downloads](http://developer.apple.com/downloads) or [Xcode 3](https://apps.apple.com/us/app/xcode/id497799835)
- **arch linux os only:** [base-devel](https://archlinux.org/groups/x86_64/base-devel/) have been installed

## Getting started

Clone the repository

```zsh
git clone https://github.com/backtolife2021/beautiful-code.git
# or git clone git@github.com:backtolife2021/beautiful-code.git
```

Switch to the repo folder

```zsh
cd beautiful-code
```

Install dependencies **(If you are blocked by GFW, please read the [QA](#qa) section)**

```zsh
pnpm install
```

Runs the app in the development mode

```zsh
pnpm start
# or pnpm serve
# or pnpm dev
```

production.user
Use chrome broswer open the development server link

```
google-chrome-stable http://localhost:8124/dev.user.js # in archlinux
chrome http://localhost:8124/dev.user.js # in windows via scoop
```

### Bundle

Bundle everything from `src/` into `dist/production.user.js`:

`pnpm build`

### Development server

`pnpm dev`

This will automatically update `dist/production.user.js` when code changes and serve it on [localhost:8124](http://localhost:8124/).

It also creates a second userscript `dist/dev.user.js`, if you install it in Tampermonkey, it will automatically fetch the latest version from http://localhost:8124/production.user.js once you reload a website with F5.

**Note: If you have added [these plugins](#enhance-your-development-experience) to your editor, you rarely need to manually execute any of the above code specification related commands.**

## Enhance your development experience

The [vscode](https://code.visualstudio.com/) editor extensions listed below can enhance your development experience, and other editors should have similar plugins.

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [css modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [dotenv](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [npm Dependency Links](https://marketplace.visualstudio.com/items?itemName=herrmannplatz.npm-dependency-links)
- [SVG Language Support](https://marketplace.visualstudio.com/items?itemName=jock.svg)

## Learn More

There are a lot of link comments in the source code, if you do not understand the code, you might as well click the link in the comments to see!

## QA

Q: What to do if the dependencies cannot be downloaded due to network problems

A: ref https://npm.taobao.org/mirrors

First execute the following command to add the mirror, and then use `pnpm install` to download the dependencies

```zsh
pnpm config set registry https://registry.npm.taobao.org -g
pnpm config set disturl https://npm.taobao.org/dist -g
pnpm config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
pnpm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
pnpm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
```

power by [rollup-userscript-template](https://github.com/cvzi/rollup-userscript-template)
