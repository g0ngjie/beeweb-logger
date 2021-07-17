import listener from "./common/listener";
import { loadConfig } from "./common/configure";
import { mountPageEvent } from "./common/event";
import { IConfigOptions } from "./common/schema";
import { handleClick, handleCustom } from "./common/handler";

/**
 * 页面挂载
 */
function mount(options?: IConfigOptions): void {
  if (options) loadConfig(options)
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