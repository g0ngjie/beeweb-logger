import { handlePage } from "./handler";
import { IEvent, IStateType } from "./schema";

/**
 * 监听Web页面事件
 */
export function mountPageEvent(): void {
    let beforeTime = Date.now()
    // 前置页面
    let frontPage: string = ''
    /**
     * @description 覆写history API
     * @param {String} name  需要覆写的history API name
     */
    const overWrite = function (name: 'pushState' | 'replaceState') {
        const history: History = window.history
        let historyEvt: Function = history[name];
        return function () {
            let target = historyEvt.apply(history, arguments);
            let evt: Event = new Event(name);
            // evt.arguments = arguments;
            window.dispatchEvent(evt);
            return target;
        };
    };
    history.pushState = overWrite('pushState');
    history.replaceState = overWrite('replaceState');

    /**获取停留时长 */
    function getStayTime() {
        const currentTime = Date.now()
        const stayTimes = currentTime - beforeTime
        beforeTime = currentTime
        return stayTimes
    }

    /**页面事件触发 */
    function currentTrigger(type: IStateType, event?: IEvent): void {
        const stayTime: number | string = type === 'load' ? 0 : getStayTime()

        // 当前页面
        const currentPage: string = window.location.href
        // 如果存在前置页面
        if (frontPage) {
            // 则触发离开
            // 并记录时长
            handlePage(type, stayTime, frontPage, 'leave')
        }
        // 更新前置页面
        frontPage = currentPage
        // 进入新页面
        handlePage(type, 0, currentPage, 'enter')
    }

    /***************************************页面刷新*********************************************/
    window.addEventListener("load", function (event: WindowEventMap['load']) {
        currentTrigger('load', event)
    });

    /***************************************页面不刷新，路由变化**********************************/
    /**
     * @description 全局事件监听：history.go()、history.back()、history.forward()
     */
    window.addEventListener('popstate', function (event: WindowEventMap['popstate']) {
        currentTrigger('popstate', event)
    })

    /**
     * @description 全局事件监听：history.pushState()、history.replaceState()
     */
    window.addEventListener('pushState', function (event: Event) {
        currentTrigger('pushState', event)
    });
    window.addEventListener('replaceState', function (event: Event) {
        currentTrigger('replaceState', event)
    });
}
