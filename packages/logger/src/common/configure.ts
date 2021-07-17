import { Config } from "./enum";
import { IConfigOptions, IEncryptionFunc } from "./schema";
import listener from "./listener";
import sender from "./sender";

/**配置百度地图URI */
function configMapURI(uri: string): void {
    (window as any)[Config.LOCATION_URL.toString()] = uri
}

/**配置服务端接收 */
function configServerURL(url: string): void {
    (window as any)[Config.SERVER_URL.toString()] = url
}

/**
 * 启用加密
 * 需要注入一条加密函数
 */
function configEncryption(encryptionFunc: IEncryptionFunc): void {
    (window as any)[Config.ENCRYPTION.toString()] = encryptionFunc
}

/**配置项目名 */
function configProject(projectName: string): void {
    (window as any)[Config.PROJECT.toString()] = projectName
}

/**加载配置 */
export function loadConfig(options: IConfigOptions): void {
    const { project, mapURI, serverURL, encryptionFunc } = options
    // 项目
    if (project) configProject(project)
    // 默认配置
    if (mapURI) configMapURI(mapURI)
    if (serverURL) {
        configServerURL(serverURL)
        listener((event: any) => sender(event.detail))
    }
    // 加密
    if (encryptionFunc) configEncryption(encryptionFunc)
}