import trigger from "./trigger";
import { IAddress, IBaiduMapAddress, IClickData, ICustomData, IPageData, IPageStatus, IStateType } from "./schema";
import { formatDate, getOs, getAddressInfo, getStatement, getTraceId, getKernelVersion, getAddressInfoByBaiduMap } from "./utils";
import { Config } from "./enum";

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
        kernel: getKernelVersion(),
        os: getOs(),
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
        kernel: getKernelVersion(),
        os: getOs(),
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    })
}

function pageTrigger(
    stateType: IStateType,
    stayTime: number | string,
    url: string,
    pageStatus: IPageStatus,
    address: IAddress | IBaiduMapAddress
) {
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
        kernel: getKernelVersion(),
        os: getOs(),
        address
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
    const mapURI: string = (window as any)[Config.LOCATION_URL.toString()]
    if (!mapURI) getAddressInfo()
        .then((address: IAddress) => pageTrigger(stateType, stayTime, url, pageStatus, address))
    else getAddressInfoByBaiduMap()
        .then((address: IBaiduMapAddress) => pageTrigger(stateType, stayTime, url, pageStatus, address))
}
