import mongoose from "mongoose"
const dbInfo = require("./config/db.json");
export class ConnectDB {
    constructor() {
        this.connectDB();
    }
    private connectDB() {
        let url = `mongodb+srv://${dbInfo.user}:${dbInfo.password}@${dbInfo.url}/${dbInfo.database}?${dbInfo.else}`;
        // console.log(url);
        mongoose.connect(url, { useUnifiedTopology: true });
    }
}
new ConnectDB();