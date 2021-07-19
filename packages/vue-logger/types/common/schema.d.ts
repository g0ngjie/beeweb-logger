export declare type IType = 'page' | 'click' | 'custom';
export declare type IStateType = 'load' | 'popstate' | 'pushState' | 'replaceState';
export declare type IEvent = WindowEventMap['load'] | WindowEventMap['popstate'] | Event;
export declare type IPageStatus = 'enter' | 'leave';
interface IBaseData {
    eventType: IType;
    navigatorInfo: any;
    traceId?: string;
    statement?: {
        [state: string]: any;
    };
}
export interface IAddress {
    lat?: string;
    lng?: string;
    location?: {
        address: string;
        content: any;
    };
    err?: string;
}
export interface IPageData extends IBaseData {
    stateType: IStateType;
    event?: IEvent;
    content?: any;
    url: string;
    createTime: string;
    stayTime: number | string;
    pageStatus: IPageStatus;
    address: IAddress;
}
export interface IClickData extends IBaseData {
    content?: any;
    url: string;
    createTime: string;
}
export interface ICustomData extends IBaseData {
    [key: string]: any;
}
/**加密函数 */
export declare type IEncryptionFunc = Function | 'useDefault';
export interface IConfigOptions {
    traceId?: string;
    mapURI?: string;
    serverURL?: string;
    encryptionFunc?: IEncryptionFunc;
    statement?: {
        [state: string]: any;
    };
}
export {};
