import { IPageStatus, IStateType } from "./schema";
/**
 * 自定义触发器
 * @param {any} content
 */
export declare function handleCustom(content?: any): void;
/**
 * 点击触发器
 * @param {any} content
 */
export declare function handleClick(content?: any): void;
/**
 * 页面级别触发器
 * @param {IStateType} stateType
 * @param {IEvent} event
 * @param {number | string} stayTime
 * @param {string} url
 * @param {IPageStatus} pageStatus
 */
export declare function handlePage(stateType: IStateType, stayTime: number | string, url: string, pageStatus: IPageStatus): void;
