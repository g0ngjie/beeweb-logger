# @beeweb/logger

一个方便统计页面 PV/UV、触发和交互的轻量级前端埋点工具

### 安装

```shell
$ npm install --save @beeweb/logger
# or
$ yarn add @beeweb/logger
```

### 使用

```js
import { mount, listener } from '@beeweb/logger';

// 需要挂在到项目实例中
// 默认集成Page级别事件监听
mount()

// 监听埋点回调
listener(function(response) {...})
/* listener response
{
    address: {xxx},
    kenel: "chrome 92.0.4515.131",
    os: "Windows",
    createTime: "2021-07-17 19:46:01"
    eventType: "page"
    pageStatus: "enter"
    stateType: "load"
    statement: {xxx},
    stayTime: 0,
    traceId: xxx,
    url: "http://127.0.0.1:5500/packages/logger/example/index.html"
}
*/
```

#### mount 函数

> 可接收一个 options 对象

| Option         | Type                     | Required | Description                                                                               |
| :------------- | :----------------------- | :------- | :---------------------------------------------------------------------------------------- |
| traceId        | String                   | false    | 链路 ID                                                                                   |
| statement      | Object                   | false    | 声明                                                                                      |
| mapURI         | String                   | false    | 百度地图定位                                                                              |
| serverURL      | String                   | false    | 后端接口请求地址                                                                          |
| encryptionFunc | Function \| 'useDefault' | false    | Function: 接收一个加密函数,对监听到的参数做处理<br />'useDefault': 默认使用**Base64**加密 |

#### listener 函数

> 事件触发回调函数

```js
import { listener, handleClick, handleCustom, mountPageEvent } from '@beeweb/logger';

// 挂载页面监听
mountPageEvent();

// 触发点击事件函数
handleClick(...args);

// 自定义事件函数
handleCustom(...args)

// 监听埋点回调
listener(function(response) {...})
```

#### mountPageEvent 函数

> 挂载页面级别监听
>
> 监听类别: 'load' | 'popstate' | 'pushState' | 'replaceState'

#### handleClick 函数

> 接收一个任意类型的参数

#### handleCustom 函数

> 接收一个任意类型的参数
>
> 此功能用于辨识定制化需求触发器
