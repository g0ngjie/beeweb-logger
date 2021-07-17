import { mountPageEvent } from "./common/event";
import listener from "./common/listener";
import { handleClick, handleCustom } from "./common/handler";
import { configEncryption, configMapURI, configServerURL } from "./common/config";
import sender from "./common/sender";
import { IEncryptionFunc } from "./common/schema";

/**
 * cjs 页面挂载
 */
function mount(options?: {
  mapURI?: string,
  serverURL?: string,
  encryptionFunc?: IEncryptionFunc
}): void {
  const { mapURI, serverURL, encryptionFunc } = (options as any)
  // 默认配置
  if (mapURI) configMapURI(mapURI)
  if (serverURL) {
    configServerURL(serverURL)
    listener((event: any) => sender(event.detail))
  }
  // 加密
  if (encryptionFunc) configEncryption(encryptionFunc)
  // 挂载页面事件
  mountPageEvent()
}

export {
  mount,
  listener,
  handleClick,
  handleCustom,
  mountPageEvent
}