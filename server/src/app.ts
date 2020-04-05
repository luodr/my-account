import "./ConnectDB"
import express from 'express'
import { json, urlencoded } from 'body-parser'
import session from "express-session"
var https = require('https');
var http = require('http');
import { RouterArray } from "./decorators/web"
import fs from "fs"
var certificate = fs.readFileSync(__dirname + '/config/3715413_sinlo.net.pem', 'utf8');

var privateKey = fs.readFileSync(__dirname + '/config/3715413_sinlo.net.key', 'utf8');
var credentials = { key: privateKey, cert: certificate };
class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        // var http = http.createServer(this.app);
        this.config()
        //加载路由
        this.loadRouter();
        //注册路由
        this.registerRouter();
        var httpsServer = https.createServer(credentials, this.app);
        //https监听3000端口
        httpsServer.listen(8080);
        this.app.listen(3000, (err) => {
            if (!err)
                console.log("开启服务器成功");


        });

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
            this.app[value.method]("/api/"+value.path, value.fun);
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
            console.log(req.path);
            
            res.header('Access-Control-Allow-Origin', '*');
            //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', '*');
            res.header("Content-Security-Policy: upgrade-insecure-requests");
            res.header('Content-Type', 'application/json;charset=utf-8');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header("P3P", "CP=CAO PSA OUR");
            next();
        });

    }
}
new App();