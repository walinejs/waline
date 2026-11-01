# @waline/vercel

![Version](https://img.shields.io/npm/v/@waline/vercel?color=blue&logo=npm&style=flat-square)

The backend for the Waline comment system, built on [ThinkJS](https://thinkjs.org/).

## Installation

```shell
npm install @waline/vercel --save
```

## Configuration

Waline supports multiple storage services. Configure **one** of the following storage backends:

| Storage                | Required environment variables                                                   |
| ---------------------- | -------------------------------------------------------------------------------- |
| PostgreSQL             | `PG_DB` (or `POSTGRES_DATABASE`), `PG_USER`, `PG_PASSWORD`, `PG_HOST`, `PG_PORT` |
| MySQL                  | `MYSQL_DB`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`           |
| SQLite                 | `SQLITE_PATH`                                                                    |
| TiDB                   | `TIDB_DB`, `TIDB_USER`, `TIDB_PASSWORD`, `TIDB_HOST`, `TIDB_PORT`                |
| MongoDB                | `MONGO_DB`, `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_HOST`, `MONGO_PORT`           |
| CloudBase              | `TCB_ENV` (and optionally `TCB_ID`, `TCB_KEY`, `TENCENTCLOUD_SECRETKEY`)         |
| GitHub                 | `GITHUB_TOKEN`, `GITHUB_REPO`, and optionally `GITHUB_PATH`                      |
| LeanCloud (deprecated) | `LEAN_ID`, `LEAN_KEY`, `LEAN_MASTER_KEY`                                         |

You also need to set `JWT_TOKEN` to a random string for signing login tokens. It is required for SQLite deployments, and strongly recommended for every deployment.

The full environment variable reference is available at <https://waline.js.org/reference/server/env.html>. For a step-by-step setup guide, see <https://waline.js.org/guide/get-started/>.

### Spam protection

Waline supports [Akismet](https://akismet.com/) spam protection. It is enabled by default with a shared public key; set `AKISMET_KEY` to `false` to disable it, or to your own key to use your account.

## Deploy

[![Deploy button](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

Click the button to deploy quickly, or check the deployment guides at <https://waline.js.org/guide/deploy/>.
