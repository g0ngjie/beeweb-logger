import { mountWebPageEvent } from "./common/event";
import listener from "./common/listener";
import { handleClickTrigger } from "./common/handler";
import { configMapURI, configServerURL } from "./common/config";
import sender from "./common/sender";

/**
 * cjs 页面挂载
 */
function mount(options: { mapURI?: string, serverURL?: string }): void {
  // 默认配置
  if (options.mapURI) configMapURI(options.mapURI)
  if (options.serverURL) {
    configServerURL(options.serverURL)
    listener((event: any) => sender(event.detail))
  }
  // 挂载页面事件
  mountWebPageEvent()
}

export {
  mount,
  listener,
  handleClickTrigger,
  mountWebPageEvent
}