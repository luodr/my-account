import mongoose from "mongoose"

class IuserInfo {
    name: string;
    age: number;
}

interface IUser extends mongoose.Document {
    /**手机号 */
    phoneNumber: string;
    /**预算 */
    budget: number;
    /**姓名--年龄之类的 */
    info: IuserInfo;
    /**创建日期 */
    createdAt: Date;
}
const schema = new mongoose.Schema({
    phoneNumber: { type: String },
    budget: { type: Number },
    info: {
        name: String,
        age: Number
    },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'user', id: true });

export default mongoose.model<IUser>("user", schema);