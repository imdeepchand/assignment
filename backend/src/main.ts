
import { App } from "./app";
import { user_router } from "./routes/users.routes";

const app = new App({
    apis: [
        {
            version: "v1",
            routers: [user_router]
        }
    ]
})

app.start();