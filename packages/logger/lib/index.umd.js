(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.logger = {}));
}(this, (function (exports) { 'use strict';

    var EventType;

    (function (EventType) {
      EventType["EVENT"] = "___beeweb_logger_event___";
    })(EventType || (EventType = {}));

    var Config;

    (function (Config) {
      Config["TRACE_ID"] = "___beeweb_trace_id___";
      Config["LOCATION_URL"] = "___beeweb_logger_location_url___";
      Config["SERVER_URL"] = "___beeweb_logger_server_url__";
      Config["ENCRYPTION"] = "___beeweb_logger_encryption__";
      Config["STATEMENT"] = "___beeweb_statement__";
    })(Config || (Config = {}));

    function listener (cb) {
      window.addEventListener(EventType.EVENT.toString(), function (target) {
        if (cb) cb(target);
      }, false);
    }

    function typeIs(target) {
      var Type = {
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

      };
      var find_proto = Object.prototype.toString.call(target);
      var type_to_string = Type[find_proto];
      return type_to_string;
    }

    /**
     * 格式化时间
     * @param {IFormatDate} fmt 
     * @param {Date} date 
     * @returns 
     */
    function formatDate(date, fmt) {
      var target = fmt;
      var o = {
        "M+": date.getMonth() + 1,
        // 月份
        "d+": date.getDate(),
        // 日
        "h+": date.getHours(),
        // 小时
        "m+": date.getMinutes(),
        // 分
        "s+": date.getSeconds(),
        // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3),
        // 季度
        "S": date.getMilliseconds() // 毫秒

      };
      if (/(y+)/.test(fmt)) target = target.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(target)) target = target.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }

      return target;
    }
    var Base64 = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function encode(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);

        while (f < e.length) {
          n = e.charCodeAt(f++);
          r = e.charCodeAt(f++);
          i = e.charCodeAt(f++);
          s = n >> 2;
          o = (n & 3) << 4 | r >> 4;
          u = (r & 15) << 2 | i >> 6;
          a = i & 63;

          if (isNaN(r)) {
            u = a = 64;
          } else if (isNaN(i)) {
            a = 64;
          }

          t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }

        return t;
      },
      _utf8_encode: function _utf8_encode(e) {
        e = e.replace(/rn/g, "n");
        var t = "";

        for (var n = 0; n < e.length; n++) {
          var r = e.charCodeAt(n);

          if (r < 128) {
            t += String.fromCharCode(r);
          } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128);
          } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128);
          }
        }

        return t;
      }
    };
    /**获取项目 */

    function getStatement() {
      var statement = window[Config.STATEMENT.toString()];
      return statement || {};
    }
    /**获取链路ID */

    function getTraceId() {
      var traceId = window[Config.TRACE_ID.toString()];
      return traceId;
    }
    /**
     * @param {string} src
     * @param {Function} cb
     */

    function appendJs(src, cb) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = cb;
      document.head.appendChild(script);
      return function () {
        document.head.removeChild(script);
      };
    }

    var cacheLocation;
    function getAddressInfoByBaiduMap() {
      return new Promise(function (resolve) {
        var mapURI = window[Config.LOCATION_URL.toString()];
        if (!mapURI) resolve({
          err: '未配置'
        });else if (cacheLocation) resolve(cacheLocation);else {
          var rmScript = appendJs('https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', function () {
            window.$.ajax({
              url: mapURI,
              type: "POST",
              dataType: "jsonp",
              success: function success(location) {
                var _location$content$poi = location.content.point,
                    x = _location$content$poi.x,
                    y = _location$content$poi.y;

                var _BMap$MercatorProject = new window.BMap.MercatorProjection().pointToLngLat(new window.BMap.Pixel(x, y)),
                    lng = _BMap$MercatorProject.lng,
                    lat = _BMap$MercatorProject.lat;

                rmScript();
                cacheLocation = {
                  lng: lng,
                  lat: lat,
                  location: location
                };
                resolve(cacheLocation);
              }
            });
          });
        }
      });
    }
    /**获取经纬度，地址等信息 */

    function getAddressInfo() {
      return new Promise(function (resolve) {
        if (cacheLocation) resolve(cacheLocation);else fetch('https://ipapi.co/json/').then(function (res) {
          return res.json();
        }).then(function (addr) {
          var ip = addr.ip,
              latitude = addr.latitude,
              longitude = addr.longitude,
              version = addr.version,
              region = addr.region,
              city = addr.city;
          cacheLocation = {
            ip: ip,
            latitude: latitude,
            longitude: longitude,
            version: version,
            region: region,
            city: city
          };
          resolve(cacheLocation);
        })["catch"](function (err) {
          resolve({
            err: '位置获取异常'
          });
        });
      });
    }
    /**获取浏览器内核和版本信息 */

    function getKernelVersion(type) {
      var browser = {
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

      var result;

      switch (type) {
        case 'name':
          result = browser.appname;
          break;

        case 'version':
          result = browser.version;
          break;

        default:
          result = browser.appname + ' ' + browser.version;
          break;
      }

      return result;
    }

    /**获取操作系统 */
    function getOs() {
      var os = 'Unknown';
      var UserAgent = navigator.userAgent.toLowerCase();
      if (navigator.platform == 'Win32' || navigator.platform == 'Windows') os = 'Windows';
      if (navigator.platform == 'Mac68K' || navigator.platform == 'MacPPC' || navigator.platform == 'Macintosh' || navigator.platform == 'MacIntel') os = 'Mac';
      if (UserAgent.indexOf('iphone') > -1) os = 'iPhone';
      if (UserAgent.indexOf('ipod') > -1) os = 'iPod';
      if (UserAgent.indexOf('ipad') > -1) os = 'iPad';

      if (UserAgent.indexOf('linux') > -1) {
        if (UserAgent.indexOf('android') > -1) os = 'Android';else os = 'Linux';
      }

      return os;
    }

    function cleanArray(actual) {
      var newArray = [];

      for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i]);
        }
      }

      return newArray;
    }
    /**
     * object -> ?xxx=xxx&xxx=xxx
     *
     * @export
     * @param {Object} e
     * @returns {string}
     */


    function queryToString(e) {
      if (!e) return '';
      var type = typeIs(e);
      if (type !== 'object') return '';

      var _params = cleanArray(Object.keys(e).map(function (key) {
        if (!e[key]) return ''; // return `${encodeURIComponent(key)}=${encodeURIComponent(e[key])}`

        return "".concat(key, "=").concat(e[key]);
      })).join('&');

      return _params ? "?".concat(_params) : '';
    }

    function sender (data) {
      var fetchUrl = window[Config.SERVER_URL.toString()];
      if (fetchUrl) fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data
        }),
        mode: 'cors'
      });
    }
    /*
        Chrome 37+
        Firefox (Gecko) 31+
        Internet Explorer 不支持
        Opera 24+
        Safari 不支持
    */

    /**异步数据传输 */

    function asyncSenderTxt(data) {
      var contentTxt = queryToString({
        data: data
      });
      var serverURL = window[Config.SERVER_URL.toString()];
      if (serverURL) navigator.sendBeacon("".concat(serverURL, "/async"), contentTxt);
    }

    /**配置百度地图URI */

    function configMapURI(uri) {
      window[Config.LOCATION_URL.toString()] = uri;
    }
    /**配置服务端接收 */


    function configServerURL(url) {
      window[Config.SERVER_URL.toString()] = url;
    }
    /**
     * 启用加密
     * 需要注入一条加密函数
     */


    function configEncryption(encryptionFunc) {
      window[Config.ENCRYPTION.toString()] = encryptionFunc;
    }
    /**配置项目名 */


    function configStatement(statement) {
      window[Config.STATEMENT.toString()] = statement;
    }
    /**配置链路ID */


    function configTraceId(traceId) {
      window[Config.TRACE_ID.toString()] = traceId;
    }
    /**加载配置 */


    function loadConfig(options) {
      var traceId = options.traceId,
          mapURI = options.mapURI,
          serverURL = options.serverURL,
          encryptionFunc = options.encryptionFunc,
          statement = options.statement; // 默认配置

      if (traceId) configTraceId(traceId);
      if (mapURI) configMapURI(mapURI);

      if (serverURL) {
        configServerURL(serverURL);
        listener(function (event) {
          return sender(event.detail);
        });
      } // 声明


      if (statement) configStatement(statement); // 加密

      if (encryptionFunc) configEncryption(encryptionFunc);
    }

    /**
     * 消息触发器
     * @param {EventType} type 事件类型
     * @param {IPageData} data 数据
     */

    function trigger (data) {
      var encryptionFunc = window[Config.ENCRYPTION.toString()];
      var detail; // 判断是否启用加密

      if (encryptionFunc) {
        if (encryptionFunc === 'useDefault') detail = Base64.encode(JSON.stringify(data)); // 此功能与listener一样
        else detail = encryptionFunc(data);
      } else detail = data; // 浏览器关闭


      if (data.stateType === 'unload') {
        asyncSenderTxt(detail);
      }

      var event = new CustomEvent(EventType.EVENT, {
        detail: detail,
        bubbles: false,
        cancelable: true
      });
      window.dispatchEvent(event);
    }

    var cacheAddress = {};
    /**
     * 自定义触发器
     * @param {any} content 
     */

    function handleCustom(content) {
      trigger({
        eventType: 'custom',
        traceId: getTraceId(),
        statement: getStatement(),
        content: content,
        url: window.location.href,
        kernel: getKernelVersion(),
        os: getOs(),
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        address: cacheAddress
      });
    }
    /**
     * 点击触发器
     * @param {any} content 
     */

    function handleClick(content) {
      trigger({
        eventType: 'click',
        traceId: getTraceId(),
        statement: getStatement(),
        content: content,
        url: window.location.href,
        kernel: getKernelVersion(),
        os: getOs(),
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        address: cacheAddress
      });
    }

    function pageTrigger(stateType, stayTime, url, pageStatus, address) {
      trigger({
        eventType: 'page',
        traceId: getTraceId(),
        statement: getStatement(),
        stateType: stateType,
        // event,
        url: url,
        pageStatus: pageStatus,
        stayTime: stayTime,
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        kernel: getKernelVersion(),
        os: getOs(),
        address: address
      });
    }
    /**
     * 页面级别触发器
     * @param {IStateType} stateType 
     * @param {IEvent} event 
     * @param {number | string} stayTime 
     * @param {string} url 
     * @param {IPageStatus} pageStatus 
     */


    function handlePage(stateType, stayTime, url, pageStatus) {
      var mapURI = window[Config.LOCATION_URL.toString()];
      if (!mapURI) getAddressInfo().then(function (address) {
        cacheAddress = address;
        pageTrigger(stateType, stayTime, url, pageStatus, address);
      });else getAddressInfoByBaiduMap().then(function (address) {
        cacheAddress = address;
        pageTrigger(stateType, stayTime, url, pageStatus, address);
      });
    }
    function unloadPage(stateType, stayTime, url, pageStatus) {
      pageTrigger(stateType, stayTime, url, pageStatus, cacheAddress);
    }

    /**
     * 监听Web页面事件
     */
    function mountPageEvent() {
      var beforeTime = Date.now(); // 前置页面

      var frontPage = '';
      /**
       * @description 覆写history API
       * @param {String} name  需要覆写的history API name
       */

      var overWrite = function overWrite(name) {
        var history = window.history;
        var historyEvt = history[name];
        return function () {
          var target = historyEvt.apply(history, arguments);
          var evt = new Event(name); // evt.arguments = arguments;

          window.dispatchEvent(evt);
          return target;
        };
      };

      window.history.pushState = overWrite('pushState');
      window.history.replaceState = overWrite('replaceState');
      /**获取停留时长 */

      function getStayTime() {
        var currentTime = Date.now();
        var stayTimes = currentTime - beforeTime;
        beforeTime = currentTime;
        return stayTimes;
      }
      /**页面事件触发 */


      function currentTrigger(type, event) {
        var stayTime = type === 'load' ? 0 : getStayTime(); // 当前页面

        var currentPage = window.location.href;

        if (type === 'unload') {
          unloadPage(type, stayTime, currentPage, 'leave');
          return;
        } // 如果存在前置页面


        if (frontPage) {
          // 则触发离开
          // 并记录时长
          handlePage(type, stayTime, frontPage, 'leave');
        } // 更新前置页面


        frontPage = currentPage; // 进入新页面

        handlePage(type, 0, currentPage, 'enter');
      }
      /***************************************页面刷新*********************************************/


      window.addEventListener("load", function (event) {
        currentTrigger('load');
      });
      /***************************************页面关闭*********************************************/

      window.addEventListener('unload', function (event) {
        currentTrigger('unload');
      });
      /***************************************页面不刷新，路由变化**********************************/

      /**
       * @description 全局事件监听：history.go()、history.back()、history.forward()
       */

      window.addEventListener('popstate', function (event) {
        currentTrigger('popstate');
      });
      /**
       * @description 全局事件监听：history.pushState()、history.replaceState()
       */

      window.addEventListener('pushState', function (event) {
        currentTrigger('pushState');
      });
      window.addEventListener('replaceState', function (event) {
        currentTrigger('replaceState');
      });
    }

    /**
     * 页面挂载
     */

    function mount(options) {
      if (options) loadConfig(options); // 挂载页面事件

      mountPageEvent();
    }

    exports.handleClick = handleClick;
    exports.handleCustom = handleCustom;
    exports.listener = listener;
    exports.mount = mount;
    exports.mountPageEvent = mountPageEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
