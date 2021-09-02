import { Config } from "./enum";
import { IAddress, IBaiduMapAddress } from "./schema";

export function typeIs<T>(target: T): string {
    const Type: any = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Symbol]': 'symbol',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Function]': 'function',
        '[object Date]': 'date',
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object Map]': 'map',
        '[object RegExp]': 'regexp',
        '[object Error]': 'error',
        '[object HTMLDocument]': 'document',
        '[object global]': 'window' // window 是全局对象 global 的引用
    }
    const find_proto: string = Object.prototype.toString.call(target)
    const type_to_string: string = Type[find_proto]
    return type_to_string
}

type RelativeTimeKey = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'yy' | 'yyyy';
type CombinationYear = 'yyyy-MM' | 'yyyy-MM-dd' | 'yyyy-MM-dd hh' | 'yyyy-MM-dd hh:mm' | 'yyyy-MM-dd hh:mm:ss';
type CombinationMonth = 'MM-dd' | 'MM-dd hh' | 'MM-dd hh:mm' | 'MM-dd hh:mm:ss';
type CombinationDay = 'dd hh' | 'dd hh:mm' | 'dd hh:mm:ss';
type CombinationHour = 'hh:mm' | 'hh:mm:ss';
type CombinationMinute = 'mm:ss';
type IFormatDate = RelativeTimeKey | CombinationYear | CombinationMonth | CombinationDay | CombinationHour | CombinationMinute

/**
 * 格式化时间
 * @param {IFormatDate} fmt 
 * @param {Date} date 
 * @returns 
 */
export function formatDate(date: Date, fmt: IFormatDate): string {
    let target: string = fmt
    const o: any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        target = target.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(target)) target = target.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return target;
}

export const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e: any) {
        let t = "";
        let n, r, i, s, o, u, a;
        let f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = ((n & 3) << 4) | (r >> 4);
            u = ((r & 15) << 2) | (i >> 6);
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }
            t =
                t +
                this._keyStr.charAt(s) +
                this._keyStr.charAt(o) +
                this._keyStr.charAt(u) +
                this._keyStr.charAt(a);
        }
        return t;
    },
    _utf8_encode: function (e: any) {
        e = e.replace(/rn/g, "n");
        let t = "";
        for (let n = 0; n < e.length; n++) {
            let r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode((r >> 6) | 192);
                t += String.fromCharCode((r & 63) | 128);
            } else {
                t += String.fromCharCode((r >> 12) | 224);
                t += String.fromCharCode(((r >> 6) & 63) | 128);
                t += String.fromCharCode((r & 63) | 128);
            }
        }
        return t;
    }
};

/**获取项目 */
export function getStatement(): { [state: string]: any } {
    const statement: { [state: string]: any } = (window as any)[Config.STATEMENT.toString()]
    return statement || {}
}

/**获取链路ID */
export function getTraceId(): string | undefined {
    const traceId: string | undefined = (window as any)[Config.TRACE_ID.toString()]
    return traceId
}

/**
 * @param {string} src
 * @param {Function} cb
 */
function appendJs(src: string, cb: Function): Function {
    const script: any = document.createElement('script')
    script.src = src
    script.onload = cb
    document.head.appendChild(script)
    return function () {
        document.head.removeChild(script)
    }
}

let cacheLocation: null | IBaiduMapAddress | IAddress

export function getAddressInfoByBaiduMap(): Promise<IBaiduMapAddress> {
    return new Promise((resolve: any) => {
        const mapURI: string = (window as any)[Config.LOCATION_URL.toString()]
        if (!mapURI) resolve({ err: '未配置' })
        else if (cacheLocation) resolve(cacheLocation)
        else {
            const rmScript = appendJs('https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', () => {
                (window as any).$.ajax({
                    url: mapURI,
                    type: "POST",
                    dataType: "jsonp",
                    success: function (location: any) {
                        const { x, y } = location.content.point;
                        const { lng, lat } = new (window as any).BMap.MercatorProjection().pointToLngLat(
                            new (window as any).BMap.Pixel(x, y)
                        );
                        rmScript()
                        cacheLocation = { lng, lat, location }
                        resolve(cacheLocation)
                    }
                })
            })
        }
    })
}

/**获取经纬度，地址等信息 */
export function getAddressInfo(): Promise<IAddress> {
    return new Promise((resolve: any) => {
        if (cacheLocation) resolve(cacheLocation)
        else
            fetch('https://ipapi.co/json/').then((res) => res.json()).then((addr) => {
                const { ip, latitude, longitude, version, region, city } = addr
                cacheLocation = { ip, latitude, longitude, version, region, city }
                resolve(cacheLocation)
            }).catch(err => {
                resolve({ err: '位置获取异常' })
            })
    })
}

/**获取浏览器内核和版本信息 */
export function getKernelVersion(type?: 'name' | 'version'): string {
    const browser: any = {
        msie: false,
        firefox: false,
        opera: false,
        safari: false,
        chrome: false,
        netscape: false,
        appname: 'unknown',
        version: 0
    },
        ua = window.navigator.userAgent.toLowerCase();
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
        browser[RegExp.$1] = true;
        browser.appname = RegExp.$1;
        browser.version = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) {
        // safari
        browser.safari = true;
        browser.appname = 'safari';
        browser.version = RegExp.$2;
    }
    let result: string
    switch (type) {
        case 'name':
            result = browser.appname
            break;
        case 'version':
            result = browser.version
            break;
        default:
            result = browser.appname + ' ' + browser.version;
            break;
    }
    return result
}

type IOS = 'Windows' | 'Mac' | 'iphone' | 'ipod' | 'ipad' | 'Android' | 'Linux' | 'Unknown'

/**获取操作系统 */
export function getOs(): IOS {
    let os: IOS = 'Unknown';
    const UserAgent: string = navigator.userAgent.toLowerCase();
    if (navigator.platform == 'Win32' || navigator.platform == 'Windows') os = 'Windows'
    if (
        navigator.platform == 'Mac68K' ||
        navigator.platform == 'MacPPC' ||
        navigator.platform == 'Macintosh' ||
        navigator.platform == 'MacIntel'
    ) os = 'Mac'
    if (UserAgent.indexOf('iPhone') > -1) os = 'iphone';
    if (UserAgent.indexOf('iPod') > -1) os = 'ipod'
    if (UserAgent.indexOf('iPad') > -1) os = 'ipad'
    if (UserAgent.indexOf('Linux') > -1) {
        if (UserAgent.indexOf('Android') > -1) os = 'Android'
        else os = 'Linux'
    }
    return os;
}

function cleanArray(actual: any[]) {
    const newArray: string[] = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

/**
 * object -> ?xxx=xxx&xxx=xxx
 *
 * @export
 * @param {Object} e
 * @returns {string}
 */
export function queryToString(e: any): string {
    if (!e) return ''
    const type: string = typeIs(e)
    if (type !== 'object') return ''
    let _params: string = cleanArray(Object.keys(e).map(key => {
        if (!e[key]) return ''
        // return `${encodeURIComponent(key)}=${encodeURIComponent(e[key])}`
        return `${key}=${e[key]}`
    })).join('&')
    return _params ? `?${_params}` : ''
}