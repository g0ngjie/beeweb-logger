import trigger from "./trigger";
import { IAddress, IClickData, ICustomData, IPageData, IPageStatus, IStateType } from "./schema";
import { formatDate, getNavigatorInfo, getAddressInfo, getStatement, getTraceId, getKernel } from "./utils";

/**
 * 自定义触发器
 * @param {any} content 
 */
export function handleCustom(content?: any): void {
    trigger<ICustomData>({
        eventType: 'custom',
        traceId: getTraceId(),
        statement: getStatement(),
        content,
        url: window.location.href,
        browser: getKernel(),
        navigatorInfo: getNavigatorInfo(),
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
        traceId: getTraceId(),
        statement: getStatement(),
        content,
        url: window.location.href,
        browser: getKernel(),
        navigatorInfo: getNavigatorInfo(),
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
                traceId: getTraceId(),
                statement: getStatement(),
                stateType,
                // event,
                url,
                pageStatus,
                stayTime,
                createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                browser: getKernel(),
                navigatorInfo: getNavigatorInfo(),
                address
            })
        })
}