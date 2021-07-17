
export type IType = 'page' | 'click' | 'custom'

export type IStateType = 'load' | 'popstate' | 'pushState' | 'replaceState'

export type IEvent = WindowEventMap['load'] | WindowEventMap['popstate'] | Event

export type IPageStatus = 'enter' | 'leave'

interface IBaseData {
    // 事件类型
    eventType: IType
}

export interface IAddress {
    // Latitude 纬度
    lat?: string
    // Longtitude 经度
    lng?: string
    location?: {
        address: string
        content: any
    },
    err?: string
}

export interface IPageData extends IBaseData {
    // eventType 为 page时，type类型
    stateType: IStateType
    // 原生Event回调
    event?: IEvent
    // 内容
    content?: any
    // 页面位置
    url: string
    createTime: string
    // 页面停留时长
    stayTime: number | string
    // 页面进入/离开
    pageStatus: IPageStatus
    // 浏览器信息
    navigatorInfo: any
    address: IAddress
}

export interface IClickData extends IBaseData {
    // 内容
    content?: any
    // 页面位置
    url: string
    createTime: string
}

export interface ICustomData {
    [propName: string]: string | number
}
