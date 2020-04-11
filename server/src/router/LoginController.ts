import { Request, Response } from "express"
import SendSms from "../util/SendSms"
import Message from "../bean/Message"
import { router } from "../decorators/web"
import User from "../model/User"
export default class LoginController {
    /**
     *  发送验证码 
     */
    @router("post", "/login/send")
    private async checkoutPhone(req: Request, res: Response) {
        let PhoneNumber = req.body.PhoneNumber;
        if (!/^1[3456789]\d{9}$/.test(PhoneNumber)) {
            res.json(new Message(0, "请输入正确的手机号吗", null));
        }
        //验证码
        let securityCode = Math.random().toFixed(6).substr(2);
        //发送短信
        let msg: any = await SendSms(PhoneNumber, securityCode);
        // 用于测试
        //   let msg = { Code: "OK" };
        console.log("你的验证码是:" + securityCode);
        if (msg.Code == "OK") {
            //把验证码和手机号保存到seesion
            req.session.securityCode = securityCode;
            req.session.PhoneNumber = PhoneNumber;
            await req.session.save(() => { });
            res.json(new Message(1, "发送成功!", null));
        } else {
            res.json(new Message(0, "发送失败,请稍后重试", null));
        }
    }
    /**
     *  校验验证码.并登录,老用户直接返回,新用户创建并返回
     */
    @router("post", "/login/verify")
    private async verify(req: Request, res: Response) {
        let body = req.body;
        console.log(req.session);

        if (req.session.securityCode == body.securityCode && body.PhoneNumber == req.session.PhoneNumber) {

            let user = await User.findOne({ phoneNumber: body.PhoneNumber });
            if (!user) {
                user = new User();
                user.phoneNumber = body.PhoneNumber;
                user = await user.save();
            }
            req.session.user = user;
            await req.session.save(() => { });
            res.json(new Message(1, "登录成功", {
                phoneNumber: user.phoneNumber,
                budget: user.budget,
                info: user.info
            }));
        } else {
            res.json(new Message(0, "验证码错误!请稍后重试!", null));
        }

    }
}
