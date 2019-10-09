# WIP Analytics testing

Test scaffold for analytic plugins.

## Goals

1. Verify that plugins load the analytics provider library
2. Verify that `.page` calls map and call to the underlying window global
3. Verify that `.track` calls map and call to the underlying window global
3. Verify that `.identify` calls map and call to the underlying window global

## Example

For example, the `@analytics/google-analytics` plugin should load google analytics and track a page view

```js
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

/* initialize analytics */
const analytics = Analytics({
  app: 'analytics-demo',
  plugins: [
    // 👇 this should load google analytics onto the page
    googleAnalytics({
      trackingId: 'UA-126647663-3'
    })
  ]
})

// 👇 this fire a page view to google analytics
analytics.page()
```

## Overview

- This repo is structured similar to how other "Monorepos" work.
- Each [`example project`](./examples) has it's own Cypress configuration, tests, backend and frontend assets.
- Each of these [`example projects`](./examples) share a single "root" Cypress that is installed in the root `node_modules` folder.
- This structure looks different from normal projects, but its the easiest way to manage multiple projects without installing Cypress independently for each one.

## Installation

```bash
## install all dependencies
npm install
```

## Opening Cypress GUI

```bash
cd ./examples/testing-dom__drag-drop
# start local server
npm start &
# and open Cypress GUI
npm run cypress:open
```

## Running from the CLI

Same as running Cypress GUI but with `cypress run` command (and any CLI arguments)

```bash
cd ./examples/testing-dom__drag-drop
# start local server
npm start &
# run Cypress tests headlessly
npm run cypress:run

### runs all example projects in specific browser
### similar to cypress run --browser <name>
npm run cypress:run -- --browser chrome

### sends test results, videos, screenshots
### to Cypress dashboard
npm run cypress:run -- --record
```

## Development

See [Development.md](Development.md)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

# Notes

Might need to expose internals https://stackoverflow.com/questions/42508142/sinon-basic-use-with-internal-functions
https://stackoverflow.com/questions/52332152/how-to-mock-an-inner-function-in-sinon
https://stackoverflow.com/questions/34575750/how-to-stub-exported-function-in-es6

might need proxy require https://github.com/sinonjs/sinon/issues/562#issuecomment-109557931
No extra dep solution 3 https://medium.com/@minaluke/how-to-stub-spy-a-default-exported-function-a2dc1b580a6b
https://github.com/cypress-io/cypress/issues/2597#issuecomment-429154959
---

- https://github.com/etcaterva/eas-frontend/blob/b484bc393e9c1b784d3c3163c4e4210978a52c04/cypress/integration/FacebookRaffle_spec.js#L9
- https://github.com/etcaterva/eas-frontend/blob/b484bc393e9c1b784d3c3163c4e4210978a52c04/cypress/support/commands.js#L61-L65
- spy action https://github.com/shopgate/theme-gmd/blob/95a9ea746d558103aaaa47dcd2f84d009e5634c7/e2e/integration/functional/CartPage.js#L38 + https://github.com/shopgate/pwa/blob/61b5656f1c1c854e3848c2b9e71e9c3d48ba7894/utils/e2e/support/commands.js#L32-L69
