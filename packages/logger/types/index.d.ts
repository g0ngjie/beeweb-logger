import { mountWebPageEvent } from "./common/event";
import listener from "./common/listener";
import { handleClickTrigger } from "./common/handler";
import { IEncryptionFunc } from "./common/schema";
/**
 * cjs 页面挂载
 */
declare function mount(options: {
    mapURI?: string;
    serverURL?: string;
    encryptionFunc?: IEncryptionFunc;
}): void;
export { mount, listener, handleClickTrigger, mountWebPageEvent };
