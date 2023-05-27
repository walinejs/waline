---
title: plugin system
icon: plugin
---

Users can extend the custom hook function through the Hook provided by Waline to realize custom functions. But if users want to share custom Hook methods, they can only use the copy method. To solve this problem, the Waline plugin system came into being.

## Install the plugin

A new `plugins` attribute has been added to Waline's initial configuration, which supports configuring multiple plugins.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');


module.exports = Waline({
   plugins: [
     HelloWorldPlugin,
   ],
});
```

In addition to directly installing other people's plug-ins, we can also configure our own plug-in logic here.


```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
   plugins: [
     {
       hooks: {
         async postSave() {
           // do what ever you want after save comment
         }
       },
       middlewares: [
         (ctx, next) => {
           next();
         }
       ]
     },
   ],
});
```

## Create plugin
### Create based on Hook

It is also very simple to develop a plug-in, which is basically the same as the previous [Hook](./config.md#%E8%AF%84%E8%AE%BA-hooks) method of use, but with a layer of encapsulation.

```js
module.exports = {
   hooks: {
     async postSave() {
       // do what ever you want after save comment
     }
   }
}
```

It should be noted that if the user installs multiple Hook plugins, the execution of the same hook function is executed in the order in which the plugins are installed. If the pre-hook method returns early, no subsequent operations will be performed.

### Create based on middleware

If Hook can't meet your needs, you can use a more powerful middleware mode to customize development. The bottom layer of Waline uses the Node.js framework [Koa](https://koajs.com), and we expose Koa's middleware configuration as a whole, which can meet various customization needs of advanced developers.

If you don't know what Koa middleware is, you can search for it first. What you need to pay attention to when using the middleware mode to make plug-ins is that the callback method must write the execution of `next()`, otherwise the follow-up operations will not be executed.

```js
module.exports = {
   middlewares: [
     (ctx, next) => {
       next();
     },
   ]
}
```

Of course, you can put the logic of Hook-type plug-ins and middleware-type plug-ins together, and Waline supports them.

### List of plugins

Welcome to submit plugins~

- [@waline-plugins/hello-world](https://github.com/walinejs/plugins/tree/master/packages/hello-world)
- [@waline-plugins/privacy](https://github.com/walinejs/plugins/tree/master/packages/privacy)