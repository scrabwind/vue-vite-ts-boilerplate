# Vue Vite Typescript Boilerplate
## ![vue](../media/vue.png?raw=true) ➕ ![vite](../media/vitejs.png?raw=true) ![typescript](../media/typescript.png?raw=true) = ![!balance](../media/fusion.png?raw=true)

This repo is template with newest technologies _(as of 19.10.2022)_

### Main technologies helping to quickly start projects are:

- Vue 3
- Vite 3
- Vue Router 4
- Typescript 4.8.4
- Sass 1.55

### It uses opiniated formatting and linting including:

- eslint
- stylelint
- prettier
- vue-tsc

### todo/worth considering:

- Adding Vitest
- Adding Testing Library
- Adding Playwright
- Adding Storybook
- Adding Pinia

# Why some solutions were used

## Extensions

The extensions of `const.ts`, `types.ts`, `utils.ts` were used to clearify what we are importing. Seems very readable and consistent for me.

## Directory organization

I try to keep all of component related things (tests, styles, types, consts, utils, etc.) close to component as it allows me to quickly search through project. When some types are used in multiple places I move them to common folder.

## Styles

I am trying to maintain SFC approach of Vue as it is highly encourged by Vue team. Keeping styles inside `.vue` files may seem like a mistake, I will see in the future.
