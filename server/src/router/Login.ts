import express from "express"
import SendSms from "../util/SendSms"
import message from "../bean/Message"
export class Login {
    public router = express.Router();
    constructor() {
        //发送验证码
        this.router.post("/send", async (req, res, next) => {
            let b: boolean = await this.checkoutPhone(req.body.PhoneNumber, req);
            if (b) {
                res.json(new message(1, "发送成功!", null));
            } else {
                res.json(new message(0, "发送失败,请稍后重试", null));
            }
        });
        //检验验证码
        this.router.post("/verify", async (req, res) => {
            let body: any = req.body;
            let verify = this.verify(body.PhoneNumber, body.securityCode, req);
            if (verify) {//验证成功读取数据
                //   .....  略过
            } else { //验证失败
                res.json(new message(0, "验证码错误!", null));
            }
        })
    }
    /**
     *  发送验证码 
     * @param PhoneNumber  手机号码
     * @param req  请求
     */
    private async checkoutPhone(PhoneNumber: string, req): Promise<boolean> {
        if (!PhoneNumber) {
            return false;
        }
        //验证码
        let securityCode = Math.random().toFixed(6).substr(2);
        let message: any = await SendSms(PhoneNumber, securityCode);
        if (message.Code == "OK") {
            //把验证码和手机号保存到seesion
            req.seesion.securityCode = securityCode;
            req.seesion.PhoneNumber = PhoneNumber;
            return true;
        }
        return false;
    }
    /**
     *  校验验证码
     * @param PhoneNumber 手机号
     * @param securityCode  验证码
     * @param req  请求
     */
    private verify(PhoneNumber: string, securityCode: string, req): boolean {
        if (req.seesion.securityCode == securityCode && PhoneNumber == req.seesion.PhoneNumber) {
            return true;
        } else {
            return false;
        }

    }
}
export default new Login().router;