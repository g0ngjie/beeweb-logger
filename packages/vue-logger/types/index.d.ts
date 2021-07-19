import listener from "./common/listener";
import { mountPageEvent } from "./common/event";
import { IConfigOptions } from "./common/schema";
import { handleClick, handleCustom } from "./common/handler";
/**
 * 页面挂载
 */
declare function mount(options?: IConfigOptions): void;
export { mount, listener, handleClick, handleCustom, mountPageEvent };

declare module 'vue/types/vue' {
    interface Vue {
        $loggerClick(content?: any): void
        $loggerCustom(content?: any): void
    }
}
