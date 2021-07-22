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


module.exports = router;
