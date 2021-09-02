import { Config } from "./enum";
import { queryToString } from "./utils";

export default function (data: string) {
    const fetchUrl = (window as any)[Config.SERVER_URL.toString()]
    if (fetchUrl) fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data }),
        mode: 'cors'
    })
}

/*
    Chrome 37+
    Firefox (Gecko) 31+
    Internet Explorer 不支持
    Opera 24+
    Safari 不支持
*/
/**异步数据传输 */
export function asyncSenderTxt(data: string) {
    const contentTxt = queryToString({ data })
    const serverURL = (window as any)[Config.SERVER_URL.toString()]
    if (serverURL) navigator.sendBeacon(`${serverURL}/async`, contentTxt);
}