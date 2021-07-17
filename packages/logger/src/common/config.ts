import { Config } from "./enum";

/**配置百度地图URI */
export function configMapURI(uri: string): void {
    (window as any)[Config.LOCATION_URL.toString()] = uri
}

/**配置服务端接收 */
export function configServerURL(url: string): void {
    (window as any)[Config.SERVER_URL.toString()] = url
}