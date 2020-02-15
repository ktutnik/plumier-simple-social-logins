import { ServeStaticFacility } from "@plumier/serve-static"
import * as oAuth from "@plumier/social-login"
import dotenv from "dotenv"
import Plumier, { bind, response, route, WebApiFacility } from "plumier"

dotenv.config()

export class HomeController {
    @route.get("/")
    index() {
        return response.redirect("/index.html")
    }
}

export class AuthController {
    @oAuth.redirectUri()
    callback(@bind.oAuthUser() user: oAuth.OAuthUser) {
        return response.postMessage({ status: "Success", user })
    }
}

const herokuForceHttps = { trustProxyHeader: true, forceHttps: true }

new Plumier()
    .set(new WebApiFacility({ controller: __filename, ...herokuForceHttps }))
    .set(new ServeStaticFacility())
    .set(new oAuth.FacebookOAuthFacility())
    .set(new oAuth.GoogleOAuthFacility())
    .set(new oAuth.GitHubOAuthFacility())
    .set(new oAuth.GitLabOAuthFacility())
    .set(new oAuth.TwitterOAuthFacility())
    .listen(process.env.PORT || 8000)
    .catch(console.error)