import mongoose from "mongoose"
interface IItem extends mongoose.Document {

    /**类型 */
    type: string;
    /**细节 如:晚饭 or 午饭 */
    detail: string;
    /** 金额 */
    money: number;
    /** 时间  */
    date: Date;
    /** 手机号 */
    phoneNumber: string;
    /** 备注 */
    remark: string;
    /**  账户 */
    account: string;
    /** 创建时间 */
    createdAt: Date;
}

const schema = new mongoose.Schema({
    type: {
        type: String, required: [true, undefined, null, ""]
    },
    detail: {
        type: String, required: [true, undefined, null, ""]
    },
    money: {
        type: Number,min: [1]
    },
    date: { type: Date, default: Date.now },
    phoneNumber: {
        type: String, required: [true, undefined, null, ""]
    },
    remark: String,
    account: String,
    createdAt: { type: Date, default: Date.now }
}, { collection: 'item', id: true });
schema.index({ phoneNumber: 1 });
export default mongoose.model<IItem>("item", schema);