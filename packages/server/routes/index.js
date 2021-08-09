const router = require("koa-router")();
const logProxy = require("../proxy/logger");
const { insertData } = require("../utils/schedule");

router.get("/err", async (ctx, next) => {
  ctx.type = "html";
  ctx.body = `<h2 style="color: #F56C6C; text-align: center;margin-top: 10%;">Error Visited</h2>`;
  ctx.status = 200;
  await next();
});

router.post("/", async (ctx, next) => {
  const { data } = ctx.request.body;
  await insertData(data);
  ctx.status = 200;
  await next();
});

/**查询全部 */
router.get("/today", async (ctx, next) => {
  const query = ctx.request.query
  const search = {}
  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const value = query[key];
      search[key] = value
    }
  }
  const all = await logProxy.findToday(search)
  ctx.body = all;
  ctx.status = 200;
  await next();
});

/**查询当天各城市访问情况 */
router.get("/city", async (ctx, next) => {
  const citys = await logProxy.findTodayCitys()
  ctx.body = citys;
  ctx.status = 200;
  await next();
})

/**(当天)简单结构查询 */
router.get("/simple", async (ctx, next) => {
  const simples = await logProxy.findTodaySimple()
  ctx.body = simples;
  ctx.status = 200;
  await next();
})

/**(当天)结构化 */
router.get("/struct", async (ctx, next) => {
  const simples = await logProxy.findTodaySimple()
  const map = {}
  for (let i = 0; i < simples.length; i++) {
    const { traceId, ...other } = simples[i];
    if (map[traceId]) map[traceId].push(other)
    else map[traceId] = [other]
  }
  ctx.body = map;
  ctx.status = 200;
  await next();
})

module.exports = router;
