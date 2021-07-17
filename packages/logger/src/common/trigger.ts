import { Config, EventType } from "./enum";
import { IEncryptionFunc } from "./schema";
import { Base64 } from "./utils";

/**
 * 消息触发器
 * @param {EventType} type 事件类型
 * @param {IPageData} data 数据
 */
export default function <T>(data: T): void {
    const encryptionFunc: IEncryptionFunc | undefined = (window as any)[Config.ENCRYPTION.toString()]
    let detail: any;
    // 判断是否启用加密
    if (encryptionFunc) {
        if (encryptionFunc === 'useDefault') detail = Base64.encode(JSON.stringify(data));
        // 此功能与listener一样
        else detail = encryptionFunc(data)
    }
    else detail = data

    const event: CustomEvent = new CustomEvent(EventType.EVENT, {
        detail,
        bubbles: false,
        cancelable: true,
    });
    window.dispatchEvent(event);
};