import Koa from 'koa';
import Router from '@koa/router';
import nextApp from '@monorepo/web';

const main = async () => {
  const app = new Koa();
  const router = new Router();

  await nextApp.prepare();

  const handle = nextApp.getRequestHandler();

  const renderNext = (route: string) => (context: Koa.Context) => {
    context.res.statusCode = 200;
    context.respond = false;

    nextApp.render(context.req, context.res, route, {
      ...((context.request && context.body) || {}),
      ...context.params,
    });
  };

  router.get('/', renderNext('/'));
  app.use(router.routes());

  app.use(async (context: Koa.Context) => {
    context.respond = false;
    handle(context.req, context.res);
  });

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${3000}`);
  });
};

main();
