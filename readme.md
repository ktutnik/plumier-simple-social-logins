## Plumier Simple Social Login Example
Simplest social login example with Facebook, Google, GitHub, GitLab and Twitter

[https://plumier-simple-social-login.herokuapp.com/](https://plumier-simple-social-login.herokuapp.com/)


> This example code uses Plumier framework entirely, If you are new to Plumier take a look at the [fundamental](https://plumierjs.com/docs/fundamentals) documentation to get started.


## Local Development Setup
* Git fork/clone 
* Create OAuth application for each provider ([Facebook](https://developers.facebook.com/), [Google](https://console.developers.google.com/), [GitHub](https://github.com/settings/developers), [GitLab](https://gitlab.com/profile/applications), [Twitter](https://developer.twitter.com/))
* Set the CALLBACK URI for each application above to: `http://localhost:8000/auth/callback`
* Get the Client ID and Client Secret for each application above. Note: for Twitter go for Consumer Key and Consumer Secret. 
* Create `.env` file on the root project, copy the content from `.env.example` 
* Add appropriate OAuth Client ID and Client Secret for each social media provider. 
* `npm install` 
* `npm run debug` to start the project

## How Its Work?

1. Plumier by default generate several login urls based on installed facility. Plumier taken care of CSRF token generation (for OAuth 2.0) and request token (for OAuth 1.0a)

| Endpoint                   | Served By               |
| -------------------------- | ----------------------- |
| `GET /auth/facebook/login` | `FacebookOAuthFacility` |
| `GET /auth/google/login`   | `GoogleOAuthFacility`   |
| `GET /auth/github/login`   | `GitHubOAuthFacility`   |
| `GET /auth/gitlab/login`   | `GitLabOAuthFacility`   |
| `GET /auth/tiwtter/login`  | `TwitterOAuthFacility`  |

2. On the front end side, add several buttons to open a new popup dialog with target url above
3. User clicked the button will redirected to the appropriate provider login screen.
4. User login using the social media provider and authorize the application.
5. User redirected to the OAuth redirect uri `http://localhost:8000/auth/callback`. OAuth redirect uri action is a common action marked with `redirectUri` decorator.
6. Before touching the redirect uri Action, in the background Plumier validate the request, check if the CSRF token valid or OAuth token is the same, then get the current user profile and then bind the data into the action parameter. 
7. Redirect uri action send the user profile data back to the main window using `response.postMessage`.
8. Main window receive the message and render the profile.