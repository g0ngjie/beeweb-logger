
export type IType = 'page' | 'click' | 'custom'

export type IStateType = 'load' | 'popstate' | 'pushState' | 'replaceState'

export type IEvent = WindowEventMap['load'] | WindowEventMap['popstate'] | Event

export type IPageStatus = 'enter' | 'leave'

interface IBaseData {
    // 事件类型
    readonly eventType: IType
    // 浏览器信息
    readonly navigatorInfo: any
}

export interface IAddress {
    // Latitude 纬度
    readonly lat?: string
    // Longtitude 经度
    readonly lng?: string
    readonly location?: {
        address: string
        content: any
    },
    readonly err?: string
}

export interface IPageData extends IBaseData {
    // eventType 为 page时，type类型
    readonly stateType: IStateType
    // 原生Event回调
    readonly event?: IEvent
    // 内容
    readonly content?: any
    // 页面位置
    readonly url: string
    readonly createTime: string
    // 页面停留时长
    readonly stayTime: number | string
    // 页面进入/离开
    readonly pageStatus: IPageStatus
    readonly address: IAddress
}

export interface IClickData extends IBaseData {
    // 内容
    readonly content?: any
    // 页面位置
    readonly url: string
    readonly createTime: string
}

export interface ICustomData {
    readonly [propName: string]: string | number
}

/**加密函数 */
export type IEncryptionFunc = Function | 'useDefault'