import { IPageData, IClickData, ICustomData } from "./schema";
/**
 * 消息触发器
 * @param {EventType} type 事件类型
 * @param {IPageData} data 数据
 */
export default function <T extends IPageData | ICustomData | IClickData>(data: T): void;
