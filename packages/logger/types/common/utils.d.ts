import { IAddress, IBaiduMapAddress } from "./schema";
export declare function typeIs<T>(target: T): string;
declare type RelativeTimeKey = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'yy' | 'yyyy';
declare type CombinationYear = 'yyyy-MM' | 'yyyy-MM-dd' | 'yyyy-MM-dd hh' | 'yyyy-MM-dd hh:mm' | 'yyyy-MM-dd hh:mm:ss';
declare type CombinationMonth = 'MM-dd' | 'MM-dd hh' | 'MM-dd hh:mm' | 'MM-dd hh:mm:ss';
declare type CombinationDay = 'dd hh' | 'dd hh:mm' | 'dd hh:mm:ss';
declare type CombinationHour = 'hh:mm' | 'hh:mm:ss';
declare type CombinationMinute = 'mm:ss';
declare type IFormatDate = RelativeTimeKey | CombinationYear | CombinationMonth | CombinationDay | CombinationHour | CombinationMinute;
/**
 * 格式化时间
 * @param {IFormatDate} fmt
 * @param {Date} date
 * @returns
 */
export declare function formatDate(date: Date, fmt: IFormatDate): string;
export declare const Base64: {
    _keyStr: string;
    encode: (e: any) => string;
    _utf8_encode: (e: any) => string;
};
/**获取项目 */
export declare function getStatement(): {
    [state: string]: any;
};
/**获取链路ID */
export declare function getTraceId(): string | undefined;
export declare function getAddressInfoByBaiduMap(): Promise<IBaiduMapAddress>;
/**获取经纬度，地址等信息 */
export declare function getAddressInfo(): Promise<IAddress>;
/**获取浏览器内核和版本信息 */
export declare function getKernelVersion(type?: 'name' | 'version'): string;
declare type IOS = 'Windows' | 'Mac' | 'iphone' | 'ipod' | 'ipad' | 'Android' | 'Linux' | 'Unknown';
/**获取操作系统 */
export declare function getOs(): IOS;
/**
 * object -> ?xxx=xxx&xxx=xxx
 *
 * @export
 * @param {Object} e
 * @returns {string}
 */
export declare function queryToString(e: any): string;
export {};
