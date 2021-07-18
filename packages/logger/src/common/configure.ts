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
function configStatement(statement: { [state: string]: any }): void {
    (window as any)[Config.STATEMENT.toString()] = statement
}

/**配置链路ID */
function configTraceId(traceId: string): void {
    (window as any)[Config.TRACE_ID.toString()] = traceId
}

/**加载配置 */
export function loadConfig(options: IConfigOptions): void {
    const { traceId, mapURI, serverURL, encryptionFunc, statement } = options
    // 默认配置
    if (traceId) configTraceId(traceId)
    if (mapURI) configMapURI(mapURI)
    if (serverURL) {
        configServerURL(serverURL)
        listener((event: any) => sender(event.detail))
    }
    // 声明
    if (statement) configStatement(statement)
    // 加密
    if (encryptionFunc) configEncryption(encryptionFunc)
}