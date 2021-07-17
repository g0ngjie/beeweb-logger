import { IEncryptionFunc } from "./schema";
/**配置百度地图URI */
export declare function configMapURI(uri: string): void;
/**配置服务端接收 */
export declare function configServerURL(url: string): void;
/**
 * 启用加密
 * 需要注入一条加密函数
 */
export declare function configEncryption(encryptionFunc: IEncryptionFunc): void;
