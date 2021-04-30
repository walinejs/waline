# How to develop

If you want to create pull request for Waline repo, you can develop with the following tips.

```sh
git clone https://github.com/lizheming/waline.git
cd waline

# please make sure your npm version is 7
npm install -g npm@7

# install dependencies
npm install

# link @waline/server to local
cd packages/server
npm link .
cd ../../example
npm link @waline/vercel

# install vercel and start vercel server
npm install -g vercel
vercel dev
```
