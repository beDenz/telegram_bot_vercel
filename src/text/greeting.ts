import { Context, Markup } from 'telegraf';
import createDebug from 'debug';
import { doc } from '../core';
import { ASK_QUESTION, MAKE_AN_APPOINTMENT } from '../commands/common';

const debug = createDebug('bot:greeting_text');

const greeting = () => async (ctx: Context) => {
  console.log('!!!greeting');
  debug('Triggered "greeting" text command');

  const userName = ctx.message?.from.last_name || '';

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells(['B2', 'B1']);
  const image = sheet.getCellByA1('B1');
  const message = sheet.getCellByA1('B2');

  await ctx.replyWithPhoto({ url: image.value.toString() });

  const greetingText = message.value.toString().replace('{{username}}', userName);

  ctx.reply(
    greetingText,
    Markup.inlineKeyboard([
      [Markup.button.callback('Записаться на онлайн прием', MAKE_AN_APPOINTMENT)],
      [Markup.button.callback('Задать вопрос', ASK_QUESTION)]
    ]));
};

export { greeting };