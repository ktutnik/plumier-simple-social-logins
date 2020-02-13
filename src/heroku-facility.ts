import { DefaultFacility, PlumierApplication, response } from "plumier";


export class HerokuForceHttpsFacility extends DefaultFacility {
    setup(app: Readonly<PlumierApplication>): void {
        app.koa.proxy = true
        app.use(async invocation => {
            if (process.env.NODE_ENV === "production") {
                const req = invocation.ctx.request;
                if (req.protocol !== "https") {
                    return response.redirect(`https://${req.hostname}${req.originalUrl}`)
                }
            }
            return invocation.proceed()
        })
    }
}