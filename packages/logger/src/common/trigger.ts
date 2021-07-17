import { EventType } from "./enum";
import { Base64 } from "./utils";

/**
 * 消息触发器
 * @param {EventType} type 事件类型
 * @param {IPageData} data 数据
 */
export default function <T>(data: T): void {
    const encodedString = Base64.encode(JSON.stringify(data));
    const event: CustomEvent = new CustomEvent(EventType.EVENT, {
        detail: encodedString,
        bubbles: false,
        cancelable: true,
    });
    window.dispatchEvent(event);
};