

# Waline Example

This directory is a brief example of a [Waline](https://waline.js.org/) app that can be deployed with Vercel and zero configuration.

## Deploy Your Own

Deploy your own Waline project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

### How We Created This Example

```js
//index.js
const Waline = require('@waline/vercel');
module.exports = Waline();

//vercel.json
{
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### Deploying From Your Terminal

You can deploy your new Waline project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```

