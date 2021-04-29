# Social account login

The latest version of Waline adds the login comment function. In addition to ordinary account login, it also supports direct login using third-party social accounts. Currently, we support login by the following social account. Of course, these social account login features are not enabled by default, and we need to do some configuration to support them.

## GitHub

To enable the GitHub account login feature, you need to configure the GitHub OAuth key. Click [《Register a new OAuth application》](https://github.com/settings/applications/new) to enter the GitHub OAuth application application page. The following configurations need to be filled here:

- Application name：The application name can be arbitrary and will be displayed when the user is authorized. The blog name is recommended.
- Homepage URL：The application homepage address can be arbitrary, and will be displayed when the user authorizes it. The blog address is recommended.
- Appcation description：The description of the application, which can be arbitrary, will be displayed when the user is authorized, and is not required.
- Authorization callback URL：The callback address of the application, which is required for login. Fill in `<serverURL>/oauth/github` where `<serverURL>` is your Waline server address.

After filling in, click <kbd>Register application</kbd> to create it successfully, and you can see the Client ID on the page. Click the <kbd>Generate a new client secret</kbd> button on the right side of the Client secrets column to get the Client secrets of the application.

Configure the key obtained just now into the Waline server according to the following environment variable configuration. After redeploying, you can log in with GitHub.

| Environment Variable | Description                                         |
| -------------------- | --------------------------------------------------- |
| `GITHUB_ID`          | Corresponding to the Client ID in GitHub OAuth App  |
| `GITHUB_SECRET`      | Corresponding to Client secrets in GitHub OAuth App |
