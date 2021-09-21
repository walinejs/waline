# (2021-09-21)

### Bug Fixes

- 🐛[bug] Comment length out of the preview box ([fdab120](https://github.com/lizheming/waline/commit/fdab12095983022b8f84cc8f201af253650a0aec))
- **client:** try compatable with safari 13, close [#531](https://github.com/lizheming/waline/issues/531) ([#557](https://github.com/lizheming/waline/issues/557)) ([a13ab21](https://github.com/lizheming/waline/commit/a13ab2109d85a8474593b087066fa3e488b9e903))

### Features

- **vercel:** add version export on response header fix [#279](https://github.com/lizheming/waline/issues/279) ([a643d87](https://github.com/lizheming/waline/commit/a643d87d6093f8b3b484efb44cdc96139bc5259d))
- [FEATURE] Uniform avatar configure by AVATAR_PROXY ([#555](https://github.com/walinejs/waline/pull/555)) ([ff0958e](https://github.com/walinejs/waline/commit/ff0958e76e18cb8d6e548af8f56cbfed16215a22))
- add sticky comment support, need upgrade to latest client and server [#509](https://github.com/walinejs/waline/pull/509) ([e4225d3](https://github.com/walinejs/waline/commit/e4225d35ae92c11e4ed11dbb056ba3e8e4d1c233))
- **doc:** add api doc https://waline.js.org/api/ ([39de903](https://github.com/walinejs/waline/commit/39de903cc0d18414ee86731f6e09f69bb51b8c24))

### BREAKING CHANGES

- **client:** Remove `avatar`, `avatarCDN` and `avatarForce` configuration for client and add `AVATAR_PROXY` for server.

# (2021-04-29)

### Features

- **client:** add wordLimit support ([#219](https://github.com/walinejs/waline/issues/219)) ([97c47cb](https://github.com/walinejs/waline/commit/97c47cb7fb41dec579f02462b70712a8042210e8))
- compat with NexT theme 8.4.0 ([e297524](https://github.com/walinejs/waline/commit/e2975244263361a7ff6fc7a236f14831f79b413c))
- **client:** add short lang 'zh' support in i18n, close [#209](https://github.com/walinejs/waline/issues/209) ([#210](https://github.com/walinejs/waline/issues/210)) ([2332f6f](https://github.com/walinejs/waline/commit/2332f6f68c14d5b0a82578d8db49cfe1f1aa6e44))

# (2021-03-12)

### Bug Fixes

- **vercel:** compat pgsql column case insensitive ([613323c](https://github.com/walinejs/waline/commit/613323c5b91640a81936bda5378f54a47abbfdea))

# (2021-03-08)

### Bug Fixes

- **client:** fix [#164](https://github.com/walinejs/waline/issues/164) remove dark mode scheme ([c9c543f](https://github.com/walinejs/waline/commit/c9c543f199a93dba0acdc194aa4b77b50ed75d53))
- **client:** article list count show error fix [#157](https://github.com/walinejs/waline/issues/157) ([7a429ac](https://github.com/walinejs/waline/commit/7a429ac50232dd8f67a2ab807d363cd7b1d9f3f3))

# (2021-03-07)

### Bug Fixes

- **vercel:** child cmts order increment fix [#163](https://github.com/walinejs/waline/issues/163) ([e31b172](https://github.com/walinejs/waline/commit/e31b17225c6a62c4f5109d0425d15428cceffdc1))

# (2021-03-06)

### Bug Fixes

- **admin:** dashboard time zone miss ([87efb46](https://github.com/walinejs/waline/commit/87efb460445871244eeacbd0664612559bf94791))
- **admin:** keyword search btn click resp ([48feb8b](https://github.com/walinejs/waline/commit/48feb8bb70501d1bb9f223126a4c6d0f9a56844d))
- **vercel:** LIKE query typo ([090230c](https://github.com/walinejs/waline/commit/090230c35fea0873e18e85fd5e5fff0de4469aa5))

# (2021-02-14)

### Bug Fixes

- **vercel:** await error ([71d93ce](https://github.com/walinejs/waline/commit/71d93cec668f2f916e292e6679dd27c7f32f4066))
- **client:** show vistor count by post return val ([b00dc64](https://github.com/walinejs/waline/commit/b00dc641d1602bcbb94eece73243ba26a432fd7a))
- **vercel:** stor update func return updated value ([59cc1c5](https://github.com/walinejs/waline/commit/59cc1c5a02028bdc3cde47c450e7ccfad438ada3))

### Features

- Customize notification template ([#154](https://github.com/walinejs/waline/issues/154)) ([1f17964](https://github.com/walinejs/waline/commit/1f179647d24b75a714427bda66eedc1b0262e0e8))

# (2021-02-13)

### Bug Fixes

- **vercel:** github store write header error ([dd41f52](https://github.com/walinejs/waline/commit/dd41f5206daff8e12be1a96343b6b7fd798bfe98))

# (2021-02-12)

### Bug Fixes

- **vercel:** github select where bug ([b19547c](https://github.com/walinejs/waline/commit/b19547ca43493c88c8f624c7ad271a1b34ecdde7))
- **vercel:** fix too_large error when file > 1M ([77b6452](https://github.com/walinejs/waline/commit/77b645283c4112d1b949ed3dd22c29791ce79e7d))

# (2021-02-08)

### Bug Fixes

- **admin:** update gravatar cdn to v2ex ([e4617e1](https://github.com/walinejs/waline/commit/e4617e1dc67287ef86dee294c7cd4c1d8e3f3add))
- **client:** update default gravatar to v2ex ([7fb0bd7](https://github.com/walinejs/waline/commit/7fb0bd7bcd102b47fab8bd5f9973693a8da91b52))

### Features

- **admin:** add i18n support, zh-cn and en-us now ([3f49034](https://github.com/walinejs/waline/commit/3f490344d67f810818eca3b326959454eaa6be43))

# (2021-01-13)

### Bug Fixes

- **client:** fix typo link check start with http ([8759f0f](https://github.com/walinejs/waline/commit/8759f0f736467325ab5a8a4728d22613c4c45405))
- **vercel:** change github oauth scope to limit access ([19ad4e2](https://github.com/walinejs/waline/commit/19ad4e242af875b13a7f562249c37859a89b36f5))
- **client:** comment list return comment count to reduce api request times ([ac4fdb9](https://github.com/walinejs/waline/commit/ac4fdb94e55c81d9f245445f299c64de3558a8b2))
- **vercel:** comment and article count api support multiple url query ([3fc206b](https://github.com/walinejs/waline/commit/3fc206b440095283a8a643db0b29414291b92b63))

# (2021-01-10)

### Features

- **admin:** compat avatar sever return ([9482e83](https://github.com/walinejs/waline/commit/9482e83e7db9438ae8c825ef9264ad9d990a3ccc))
- **client:** compat avatar server return ([86a0f0a](https://github.com/walinejs/waline/commit/86a0f0a081d7afda1bbced0ced6186dd295252ae))
- **vercel:** add avatar return support ([1ab3c9f](https://github.com/walinejs/waline/commit/1ab3c9fd08dbdd3b9f6398059fae09b6791632c9))

# (2021-01-09)

### Bug Fixes

- **vercel:** fix a serie of bugs when github oauth return email empty
- **doc:** add user_id, github, avatar field for sqlite ([f027784](https://github.com/walinejs/waline/commit/f027784e8b0b87e49c5f995bd8f28aa16747e6e0))
- **vercel:** optimize docker build image ([#131](https://github.com/walinejs/waline/pull/131))

# (2021-01-08)

### Features

- add github social login ([050f6be](https://github.com/walinejs/waline/commit/050f6beab69cccd239e0510834156265a5682671))

# (2021-01-05)

### Bug Fixes

- **client:** compat serverURL end with slash fix [#122](https://github.com/walinejs/waline/issues/122) ([196a959](https://github.com/walinejs/waline/commit/196a9591e0106f611296677cb1555a88519bf4bb))

# (2021-01-04)

### Bug Fixes

- **vercel:** add sender_email env to custom mail from ([e5e9af8](https://github.com/walinejs/waline/commit/e5e9af8f7b27930c5fde5e6838153fc78f32816a), closes [#120](https://github.com/walinejs/waline/issues/120)
- **admin:** fix recursive login bug ([8ad1fde](https://github.com/walinejs/waline/commit/8ad1fde5d4cdd367c764c30dd59e514995306a09), closes [#121](https://github.com/walinejs/waline/issues/121))

# (2021-01-03)

### Features

- **admin:** add profile setting page for dashboard and client ([aaf7836](https://github.com/walinejs/waline/commit/aaf783668b0fc046f797d509ddaddba26f37b7ab))
- **client:** add admin comment badge for client ([#118](https://github.com/walinejs/waline/pull/118)), closes [#115](https://github.com/walinejs/waline/issues/115))

### Bug Fixes

- **client:** fix post comment fail when token empty ([c8c7792](https://github.com/walinejs/waline/commit/c8c779252d3ea8b20ecd2b29343b488d5576924e)), closes [#113](https://github.com/walinejs/waline/issues/113))

# (2021-01-02)

### Features

- add client login support ([#109](https://github.com/walinejs/waline/pull/109))
- Add `MAIL_SUBJECT_ADMIN` and `MAIL_TEMPLATE_ADMIN` config variable ([7f81112](https://github.com/walinejs/waline/commit/7f81112d67beff258c169800d6f713edf9d68ea4))

# (2021-01-01)

### Features

- **doc:** Migration tool add disqus support ([9b965ed](https://github.com/walinejs/waline/commit/9b965edede35ab67471d7b7fd72f601d47512a52))

### Bug Fixed

- **vercel:** compat with empty ua ([f39d777](https://github.com/walinejs/waline/commit/f39d7775b0a047c2e89dc2c1f43e05e846c9f634))

# (2020-12-26)

### Features

- **vercel:** add COMMENT_AUDIT env to audit comment before approved ([#94](https://github.com/walinejs/waline/pull/94))

# (2020-12-24)

### Features

- **vercel:** QQ notification support ([10d08af](https://github.com/walinejs/waline/commit/10d08affdbb5f86a4b724abbaa8e7d2a272979dd))

# (2020-12-22)

### Features

- **doc:** add artalk migration support ([a4548a9](https://github.com/walinejs/waline/commit/a4548a9de66d8ea49d93de29d4a65a269d8cc292)), closes [#81](https://github.com/walinejs/waline/issues/81)

### Bug Fixes

- **doc:** migration tool compat leancloud cn output file ([1f25902](https://github.com/walinejs/waline/commit/1f2590200b2c14da665ed14a078cf59a885284d6))
- **doc:** fix csv migration miss first line data bug ([3f7c3b3](https://github.com/walinejs/waline/commit/3f7c3b36eb8d104908bffc8593bb4ec78ed0bff6))

# (2020-12-21)

### Bug Fixes

- **admin:** fix url redirect with double slash bug ([f5560eb](https://github.com/walinejs/waline/commit/f5560eb96035037d49b47f5542e9f06c08f55bb9)), closes [#80](https://github.com/walinejs/waline/issues/80)
- **vercel:** fix dashboard waline config serverURL error with pathname ([9bb9385](https://github.com/walinejs/waline/commit/9bb9385d0897e682537750cde3162174b6f865f2)), closes [#85](https://github.com/walinejs/waline/issues/85)

### Features

- **vercel:** add Telegram notification ([#83](https://github.com/walinejs/waline/pull/83))

# (2020-12-20)

### Features

- **vercel:** blog Author Email notify disable when wechat notify enabled ([f71a6d1](https://github.com/walinejs/waline/commit/f71a6d1804e32e20038ed3b96c3b394e7790e11b))

# (2020-12-19)

### Features

- **client:** post comment without reload page ([353a14c](https://github.com/walinejs/waline/commit/353a14cca58751305252df1453dd92ce77a432ad))

### Bug Fixes

- **client:** fix paste upload image can't update preview area after success ([2103295](https://github.com/walinejs/waline/commit/21032952d8fd7c9cfda3e2882b6ffd096409c37b))
- **vercel:** fix childcomment with order asc ([f8c65e4](https://github.com/walinejs/waline/commit/f8c65e4a3b40f0b66e654957c63940a25ca6f66d))

# (2020-12-18)

### Features

- **hexo-next:** add `libUrl` parameter to custom cdn url ([67653ce](https://github.com/walinejs/waline/commit/67653ce229db02748f12e04008cd8b7741ab8d78))

# (2020-12-17)

### Bug Fixes

- **client:** load emoji image when commentbox emoji button click ([7b9a1e2](https://github.com/walinejs/waline/commit/7b9a1e2214d6ee378f5c2e1993557c74493693ae)), closes [#70](https://github.com/walinejs/waline/issues/70)

# (2020-12-15)

### Bug Fixes

- **vercel:** compat valine old data without status property ([53ebc5a](https://github.com/walinejs/waline/commit/53ebc5a56c7cf24b5858fe6bb3c80c290e07eed5)), closes [#67](https://github.com/walinejs/waline/issues/67)

# (2020-12-14)

### Bug Fixes

- **vercel:** compat server url not root pathname ([17d402c](https://github.com/walinejs/waline/commit/17d402c6aed958bcee8af0e22cf8d2fd23543f68))

# (2020-12-13)

### Bug Fixes

- **client:** update image upload to alexchu ([4e7be34](https://github.com/walinejs/waline/commit/4e7be342453600488e57f9a4478bb235b9ac695a))

# (2020-12-10)

### Bug Fixes

- **client:** decode path parameter to compat ([aaa907e](https://github.com/walinejs/waline/commit/aaa907ebf4bb63d72ae9b328c8a4116ce58615de)), closes [#63](https://github.com/walinejs/waline/issues/63)

# (2020-12-09)

### Features

- **client:** add uplodImage custom method ([35abb56](https://github.com/walinejs/waline/commit/35abb5643c3693c70605e664b3a5f1d7d532b7b6))

# (2020-12-08)

### Bug Fixes

- **vercel:** compat postgresql ([2b70144](https://github.com/walinejs/waline/commit/2b7014467a23256ef875417b625654c8f7bc1f3a))

# (2020-12-06)

### Features

- **hexo/next:** add hexo-next-waline plugin ([1364169](https://github.com/walinejs/waline/commit/1364169c3583b24f47fbc14b4ef4ad325d803e51))
- **client:** add recent comment widget ([1f43c13](https://github.com/walinejs/waline/commit/1f43c138cdf44ec715282c5e7a1cd0fd0e7dd818))
- **vercel & client:** add mathjax support with katex ([9518679](https://github.com/walinejs/waline/commit/9518679051416338b9fb75e2f08aab82e7e9c6ed)), closes [#58](https://github.com/walinejs/waline/issues/58)

# (2020-12-05)

### Bug Fixes

- **admin:** login infinite loop ([87dac96](https://github.com/walinejs/waline/commit/87dac96c45b46b9b6c95f4e541bc2f9b89686d4f))
- Post comment fail error [#57](https://github.com/walinejs/waline/issues/57) ([6036351](https://github.com/walinejs/waline/commit/60363516f8730539e7d571632b972f2305387c85))
- Fix admin role check in dashboard [#56](https://github.com/walinejs/waline/issues/56) ([5438a9c](https://github.com/walinejs/waline/commit/5438a9c3fb0e0339ef60d5970ed723fb70f23cdf))

### Features

- **admin:** add patch comment process ([bdfabd5](https://github.com/walinejs/waline/commit/bdfabd58c1820c9fb7c67be42979d155db861f6a))
- @waline/cloudbase init ([02f1955](https://github.com/walinejs/waline/commit/02f1955a57e810b222c38c6263e38829e4d7178b))
- Add `DISABLE_USERAGENT` to hide ua [#55](https://github.com/walinejs/waline/issues/55) ([a6589b5](https://github.com/walinejs/waline/commit/a6589b52fd916d03c734f7a80e6cdd329c4d62d3))
