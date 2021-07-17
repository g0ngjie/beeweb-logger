export declare type IType = 'page' | 'click' | 'custom';
export declare type IStateType = 'load' | 'popstate' | 'pushState' | 'replaceState';
export declare type IEvent = WindowEventMap['load'] | WindowEventMap['popstate'] | Event;
export declare type IPageStatus = 'enter' | 'leave';
interface IBaseData {
    readonly eventType: IType;
    readonly navigatorInfo: any;
    readonly project?: string;
}
export interface IAddress {
    readonly lat?: string;
    readonly lng?: string;
    readonly location?: {
        address: string;
        content: any;
    };
    readonly err?: string;
}
export interface IPageData extends IBaseData {
    readonly stateType: IStateType;
    readonly event?: IEvent;
    readonly content?: any;
    readonly url: string;
    readonly createTime: string;
    readonly stayTime: number | string;
    readonly pageStatus: IPageStatus;
    readonly address: IAddress;
}
export interface IClickData extends IBaseData {
    readonly content?: any;
    readonly url: string;
    readonly createTime: string;
}
export interface ICustomData {
    readonly [propName: string]: string | number;
}
/**加密函数 */
export declare type IEncryptionFunc = Function | 'useDefault';
export interface IConfigOptions {
    project?: string;
    mapURI?: string;
    serverURL?: string;
    encryptionFunc?: IEncryptionFunc;
}
export {};
