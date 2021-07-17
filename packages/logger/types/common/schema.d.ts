export declare type IType = 'page' | 'click' | 'custom';
export declare type IStateType = 'load' | 'popstate' | 'pushState' | 'replaceState';
export declare type IEvent = WindowEventMap['load'] | WindowEventMap['popstate'] | Event;
export declare type IPageStatus = 'enter' | 'leave';
interface IBaseData {
    eventType: IType;
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
    navigatorInfo: any;
    address: IAddress;
}
export interface IClickData extends IBaseData {
    content?: any;
    url: string;
    createTime: string;
}
export interface ICustomData {
    [propName: string]: string | number;
}
export {};
