// import { VercelRequest, VercelResponse } from '@vercel/node';
import createDebug from 'debug';
import { Telegraf } from 'telegraf';
// import { Update } from 'telegraf/typings/core/types/typegram';
import { BotContext } from '../types/common';
// import * as express from 'express';

// const debug = createDebug('bot:dev');

// const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
// const VERCEL_URL = `${process.env.VERCEL_URL}`;

const webhookDomain = 'http://38.180.225.94';
const port = 8443;

// const production = async (
//   req: VercelRequest,
//   res: VercelResponse,
//   bot: Telegraf<BotContext>
// ) => {
//   debug('Bot runs in production mode');
//   debug(`setting webhook: ${VERCEL_URL}`);

//   if (!VERCEL_URL) {
//     throw new Error('VERCEL_URL is not set.');
//   }

//   const getWebhookInfo = await bot.telegram.getWebhookInfo();
//   if (getWebhookInfo.url !== VERCEL_URL + '/api') {
//     debug(`deleting webhook ${VERCEL_URL}`);
//     await bot.telegram.deleteWebhook();
//     debug(`setting webhook: ${VERCEL_URL}/api`);
//     await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
//   }

//   if (req.method === 'POST') {
//     await bot.handleUpdate(req.body as unknown as Update, res);
//   } else {
//     res.status(200).json('Listening to bot events...');
//   }
//   debug(`starting webhook on port: ${PORT}`);
// };

// export { production };

export const production = async (bot: Telegraf<BotContext>) => {
  console.log('!!!start production');
  // const app = express();

  // app.use(await bot.createWebhook({ domain: webhookDomain }));
  // app.listen(port, () => console.log("Listening on port", port));
  bot
	.launch({
    webhook: {
      domain: webhookDomain,
      port: port,
    } })
	.then(() => console.log("Webhook bot listening on port", port));
}