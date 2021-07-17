import { Config } from "./enum";
import { IEncryptionFunc } from "./schema";

/**配置百度地图URI */
export function configMapURI(uri: string): void {
    (window as any)[Config.LOCATION_URL.toString()] = uri
}

/**配置服务端接收 */
export function configServerURL(url: string): void {
    (window as any)[Config.SERVER_URL.toString()] = url
}

/**
 * 启用加密
 * 需要注入一条加密函数
 */
export function configEnabledEncryption(encryptionFunc: IEncryptionFunc): void {
    (window as any)[Config.ENCRYPTION.toString()] = encryptionFunc
}
