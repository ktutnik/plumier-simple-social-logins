import { ServeStaticFacility } from "@plumier/serve-static"
import * as oAuth from "@plumier/social-login"
import dotenv from "dotenv"
import Plumier, { bind, response, route, WebApiFacility } from "plumier"

dotenv.config()

export class HomeController {
    // handle root dir and redirect to the front end html
    @route.get("/")
    index() {
        return response.redirect("/index.html")
    }
}

export class AuthController {
    // Generalized oauth callback uri
    // GET /auth/callback
    @oAuth.redirectUri()
    callback(@bind.oAuthUser() user: oAuth.OAuthUser) {
        // send social media login user information back to main window
        return response.postMessage({ status: "Success", user })
    }
}

// configure Heroku to force https.
const herokuForceHttps = { trustProxyHeader: true, forceHttps: true }

new Plumier()
    .set(new WebApiFacility({ controller: __filename, ...herokuForceHttps }))
    // host the static files on www directory
    .set(new ServeStaticFacility()) 
    // install the social login facilities
    .set(new oAuth.FacebookOAuthFacility())
    .set(new oAuth.GoogleOAuthFacility())
    .set(new oAuth.GitHubOAuthFacility())
    .set(new oAuth.GitLabOAuthFacility())
    .set(new oAuth.TwitterOAuthFacility())
    .listen(process.env.PORT || 8000)
    .catch(console.error)