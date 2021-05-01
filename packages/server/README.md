## @waline/vercel

![](https://img.shields.io/npm/v/@waline/vercel?color=blue&logo=npm&style=flat-square)

This is the backend for Waline comment system.

## Installation

```
npm install @waline/vercel --save
```

## Configuration

You should set `LEAN_ID` and `LEAN_KEY` in environment variable which can get from <https://leancloud.app>.

The detail how to get `LEAN_ID` and `LEAN_KEY`: <https://waline.js.org/get-started.html>

We support [Akismet](https://akismet.com/) spam protection service default. If you want close it, please set `AKISMET_KEY` environment variable as `false`。

## Deploy

[ ![](https://vercel.com/button) ](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

Click it to deploy quickly!
