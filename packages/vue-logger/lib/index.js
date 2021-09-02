import { mount, listener, handleClick, handleCustom, mountPageEvent } from "@beeweb/logger";

const install = function (Vue) {
    mount({ serverURL: 'http://localhost:12345', encryptionFunc: 'useDefault' });
    Vue.prototype.$loggerClick = handleClick;
    Vue.prototype.$loggerCustom = handleCustom;

    listener((target) => {
        console.log("[debug]logger.listener:", target.detail);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    mount,
    mountPageEvent,
    listener
};
