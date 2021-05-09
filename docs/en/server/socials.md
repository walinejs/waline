# Social account login

The latest version of Waline adds the login feature for comment. Besides ordinary account login, waline also supports direct login using third-party social accounts.

Currently, we support login by the following social account.

::: warning

Social account login feature is not enabled by default, extra configuration is needed.

:::

## GitHub

To enable the GitHub account login feature, you need to configure the GitHub OAuth key. Click [Register a new OAuth application](https://github.com/settings/applications/new) to enter the GitHub OAuth application application page. Then fill in the following configurations:

- Application name: The application name, will be displayed when authorizing. Blog name is recommended.
- Homepage URL: The application homepage link, will be displayed when authorizing. Blog address is recommended.
- Appcation description: The description of the application, optional, will be displayed when the authorizing.
- Authorization callback URL: The callback address of the application, which is required for login. Fill in `<serverURL>/oauth/github` where `<serverURL>` is your Waline server address.

When you are finished, click <kbd>Register application</kbd> to create, and you will see the Client ID on the page. Click <kbd>Generate a new client secret</kbd> button on the right side of the Client secrets column to get the Client secrets of the application.

Configure these environment variables using the infomation above, then make a redeployment to log in with GitHub.

| Environment Variable | Description                                         |
| -------------------- | --------------------------------------------------- |
| `GITHUB_ID`          | Corresponding to the Client ID in GitHub OAuth App  |
| `GITHUB_SECRET`      | Corresponding to Client secrets in GitHub OAuth App |
