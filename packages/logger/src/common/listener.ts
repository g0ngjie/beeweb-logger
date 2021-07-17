import { EventType } from "./enum";

export default function (cb: Function) {
    window.addEventListener(EventType.EVENT.toString(), function (target: any) {
        if (cb) cb(target)
    }, false)
}