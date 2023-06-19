import { Context } from 'telegraf';
import createDebug from 'debug';
import { doc } from '../core';

const debug = createDebug('bot:greeting_text');

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const userName = ctx.message?.from.last_name || '';

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells(['B2', 'B1']);
  const image = sheet.getCellByA1('B1');
  const message = sheet.getCellByA1('B2');

  await ctx.replyWithPhoto({ url: image.value.toString() });
  ctx.reply(message.value.toString().replace('{{username}}', userName));
};

export { greeting };
