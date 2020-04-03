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
        //允许跨域
        this.Access();
        //设置 seesion
        this.app.use(session({
            secret: 'you see see money',
            // cookie: {maxAge: 1800000000000000000}, 
            rolling: true,
            resave: true,
            saveUninitialized: true
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
    //设置允许跨域访问该服务.
    public Access() {
        this.app.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        });
      
    }
}
new App().app.listen(3000);