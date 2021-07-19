import { mount, listener, handleClick } from "@beeweb/logger";
// interface ILogger {
//     readonly $logger: Function
// }
/**
 * @author Gj
 */
const install = function (Vue) {
    // mount({
    //     mapURI: "http://api.map.baidu.com/location/ip?ak=RD3fQS8GA1UeR4Ig10ejdEkTg1OfwuV3",
    //     // serverURL: "http://localhost:12345",
    // });
    Vue.prototype.$logger = handleClick;
    Vue.prototype.$logMount = mount;
    // listener((res) => {
    //     console.log("[debug]res:", res.detail);
    // });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
};
