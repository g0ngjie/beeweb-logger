import { mount, listener, handleClick } from "@beeweb/logger";

// interface ILogger {
//     readonly $logger: Function
// }

/**
 * @author Gj
 */
const install = function (Vue: any) {
    mount({
        mapURI:
            "http://api.map.baidu.com/location/ip?ak=RD3fQS8GA1UeR4Ig10ejdEkTg1OfwuV3",
        // serverURL: "http://localhost:12345",
    });
    Vue.prototype.$logger = handleClick;
    listener((res: any) => {
        console.log("[debug]res:", res.detail)
    })
};

export default {
    install,
};

