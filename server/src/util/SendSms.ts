
const Core = require('@alicloud/pop-core');
const sms = require("../config/sms.json");
export default async function (PhoneNumbers: String, code: String) {
    var client = new Core({
        accessKeyId: sms.accessKeyId,
        secretAccessKey: sms.secretAccessKey,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": PhoneNumbers,
        "SignName": sms.SignName,
        "TemplateCode": sms.TemplateCode,
        "TemplateParam": `{code:${code}}`
    }
    var requestOption = {
        method: 'POST'
    };
    return await new Promise((resolve, reject) => {
        client.request('SendSms', params, requestOption).then((result) => {
            resolve((result));
        }, (ex) => {
            resolve(ex);
        })
    });
}



