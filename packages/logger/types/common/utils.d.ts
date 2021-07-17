import { IAddress } from "./schema";
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
/**获取终端信息 */
export declare function getNavigatorInfo(): any;
/**获取项目 */
export declare function getProject(): string | undefined;
export declare function getAddressInfo(): Promise<IAddress>;
export {};
