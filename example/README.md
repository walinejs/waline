# Waline Example

This directory is a brief example of a [Waline](https://waline.js.org/) app that can be deployed with Vercel and zero configuration.

## Deploy Your Own

Deploy your own Waline project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/walinejs/waline/tree/main/example)

### How We Created This Example

```js
//index.cjs
const Application = require('@waline/vercel');

module.exports = Application({
  plugins: [],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
});

//vercel.json
{
  "name": "comment",
  "github": {
    "silent": true
  },
  "env": {
    "NODE_OPTIONS": "--experimental-require-module"
  },
  "builds": [
    {
      "src": "robots.txt",
      "use": "@vercel/static"
    },
    {
      "src": "index.cjs",
      "use": "@vercel/node",
      "config": {
        "includeFiles": [
          "node_modules/@mathjax/mathjax-newcm-font/**/*",
          "node_modules/mhchemparser/**/*",
          "node_modules/ip2region/data/**"
        ]
      }
    }
  ],
  "rewrites": [
    {
      "source": "/((?!robots\\.txt$).*)",
      "destination": "index.cjs"
    }
  ]
}
```

### Deploying From Your Terminal

You can deploy your new Waline project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
vercel
```
