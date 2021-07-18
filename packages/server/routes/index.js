const router = require("koa-router")();
const { addCache } = require("../utils/schedule");

router.get("/", async (ctx, next) => {
  ctx.type = "html";
  ctx.body = `<h2 style="color: #F56C6C; text-align: center;margin-top: 10%;">Error Visited</h2>`;
  ctx.status = 200;
  await next();
});

router.post("/", async (ctx, next) => {
  const { data } = ctx.request.body;
  await addCache(data);
  ctx.status = 200;
  await next();
});

module.exports = router;
