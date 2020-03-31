import { Request, Response } from "express"
import SendSms from "../util/SendSms"
import Message from "../bean/Message"
import { router } from "../decorators/web"
import User from "../model/User"
export default class UserController {

    /**
     * 设置预算
     */
    @router("post", "/user/setBudget")
    async setBudget(req: Request, res: Response) {
        let budget = Number(req.body.budget);
        if (budget) {
            let l = await User.updateOne({ phoneNumber: "13737148529" }, {
                budget
            });
            res.json(new Message(1, "设置预算成功!", l));
        } else {
            res.json(new Message(0, "设置预算失败!请重试", null));
        }
    }
}