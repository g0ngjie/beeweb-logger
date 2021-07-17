import trigger from "./trigger";
import { IAddress, IClickData, ICustomData, IPageData, IPageStatus, IStateType } from "./schema";
import { formatDate, getNavigatorInfo, getAddressInfo } from "./utils";

/**
 * 自定义触发器
 * @param {any} content 
 */
export function handleCustom(content?: any): void {
    trigger<ICustomData>({
        eventType: 'custom',
        content,
        url: window.location.href,
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    })
}

/**
 * 点击触发器
 * @param {any} content 
 */
export function handleClick(content?: any): void {
    trigger<IClickData>({
        eventType: 'click',
        content,
        url: window.location.href,
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    })
}

/**
 * 页面级别触发器
 * @param {IStateType} stateType 
 * @param {IEvent} event 
 * @param {number | string} stayTime 
 * @param {string} url 
 * @param {IPageStatus} pageStatus 
 */
export function handlePage(
    stateType: IStateType,
    stayTime: number | string,
    url: string,
    pageStatus: IPageStatus,
    // event?: IEvent,
): void {
    getAddressInfo()
        .then((address: IAddress) => {
            trigger<IPageData>({
                eventType: 'page',
                stateType,
                // event,
                url,
                pageStatus,
                stayTime,
                createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                navigatorInfo: getNavigatorInfo(),
                address
            })
        })
}