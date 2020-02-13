import { ServeStaticFacility } from "@plumier/serve-static"
import * as oAuth from "@plumier/social-login"
import dotenv from "dotenv"
import Plumier, { bind, response, route, WebApiFacility } from "plumier"

dotenv.config()

export class AuthController {
    @route.get("/")
    index() {
        return response.redirect("/index.html")
    }

    @oAuth.redirectUri()
    callback(@bind.oAuthUser() user: oAuth.OAuthUser) {
        return response.postMessage({ status: "Success", user })
    }
}

new Plumier()
    .set(new WebApiFacility({ controller: __filename }))
    .set(new ServeStaticFacility())
    .set(new oAuth.FacebookOAuthFacility())
    .set(new oAuth.GoogleOAuthFacility())
    .set(new oAuth.GitHubOAuthFacility())
    .set(new oAuth.GitLabOAuthFacility())
    .set(new oAuth.TwitterOAuthFacility())
    .initialize()
    .then(x => x.listen())
    .catch(console.error)