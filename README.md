# react-swc-kits

Opinionated Fullstack React SWC toolkits featuring project generation, dev server, build production bundle, and common devtools.

Inspired by `react-scripts` from [create-react-app](https://github.com/facebook/create-react-app)

> If you just start learning React, please try [create-react-app](https://github.com/facebook/create-react-app)

Why not [create-react-app](https://github.com/facebook/create-react-app)?

- You want to house your own toolkit for your startup/company, with lots of opinionated customization
- You want full control of your build configuration, but in a manner of reusable toolkits (e.g. [react-scripts](https://github.com/facebook/create-react-app), [kcd-scripts](https://github.com/kentcdodds/kcd-scripts))

## Requirement

- Node >= 14

## Main features

- SWC
- SSR (Server-side rendering)
- Universal Code-splitting (lazy + eager)
- Full HMR (Hot module reload)
- Data prefetching
- [DLL](https://webpack.js.org/plugins/dll-plugin/) ready for faster rebuild
- [PWA](https://developers.google.com/web/progressive-web-apps/) ready

## Tech stacks

|                               |                                |                                                                     |                                   |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- | --------------------------------- |
| [React](https://reactjs.org/) | [pnpm](https://pnpm.io/) | [React Helmet Async](https://github.com/staylor/react-helmet-async) | [Express](https://expressjs.com/) |
| TBC                           | Microbundle                            | [SWC](https://swc.rs/)                                              | [Jest](https://jestjs.io/)        |

## Structure

The project consists of following packages:

- [react-kits-cli](https://github.com/antonybudianto/react-swc-kits/tree/master/packages/react-kits-cli)
- [react-kits-server](https://github.com/antonybudianto/react-swc-kits/tree/master/packages/react-kits-server)

They're managed by [pnpm](https://pnpm.io/) so you don't need to do stuff manually (linking, etc) :D

## Getting started

```sh
npx react-kits init myapp
```

## Contributing

```sh
# First, clone the repo
# then install
pnpm i

# Bootstrap packages
pnpm run bootstrap

# build server (first time, or as needed)
pnpm run build:server

# Ready to develop locally!
pnpm run temp:dev

# Build and serve local
pnpm run temp:build
pnpm run temp:servelocal
```

### Release packages

```sh
npm run release

# This will run `build` script for each package before release
```

## License

MIT
