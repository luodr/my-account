
// SendSms("13737148529", "123456789");
import express from 'express'
import { json, urlencoded } from 'body-parser'
import login from "./router/Login"
import parseurl from 'parseurl'
import session from "express-session"

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config()

        // 引入路由
        this.app.get('/', function (req, res, next) {
            if (req.session.views) {
                req.session.views++
              
                res.end()
            } else {
                req.session.views = 1
                res.end()
            }
            console.log(req.session.views);

        })
        this.app.use("/login", login);

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

}
new App().app.listen(3000);