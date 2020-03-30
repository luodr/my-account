import "./ConnectDB"
import express from 'express'
import { json, urlencoded } from 'body-parser'
import session from "express-session"
import { RouterArray } from "./decorators/web"
import fs from "fs"
class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config()
        //加载路由
        this.loadRouter();
        //注册路由
        this.registerRouter();
    }
    private config() {
        //支持  application/json类型 发送数据
        this.app.use(express.json());
        //支持 application/x-www-form-urlencoded 发送数据
        this.app.use(urlencoded({ extended: false }));
        //设置 seesion
        this.app.use(session({
            secret: 'keyboard cat', resave: false,
            saveUninitialized: true, cookie: { maxAge: 60000 }
        }))
    }
    /**
     * 注册路由
     */
    private registerRouter() {
        RouterArray.decoratedRouters.forEach((value) => {
            console.log("注册:  ", value.method, "  ", value.path);
            this.app[value.method](value.path, value.fun);
        });
    }
    /**
     * 加载路由
     */
    private loadRouter() {
        const routers = __dirname + "/router"
        fs.readdirSync(routers).forEach(file => {
            if (file.includes(".js")) {
                require(routers + "/" + file);
            }
        });
    }
}
new App().app.listen(3000);