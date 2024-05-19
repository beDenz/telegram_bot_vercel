import { Context, Markup } from 'telegraf';
import createDebug from 'debug';
import { ASK_QUESTION, MAKE_AN_APPOINTMENT } from '../commands/common';
import { getTable, getCell } from '../core/table';

const debug = createDebug('bot:greeting_text');

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  await getTable(ctx);

  const userName = ctx.message?.from.last_name || '';

    const image = getCell('B1', ctx);
    const message = getCell('B2', ctx);

  await ctx.replyWithPhoto({ url: image });

  const greetingText = message.replace('{{username}}', userName);

  ctx.reply(
    greetingText,
    Markup.inlineKeyboard([
      [Markup.button.callback('Записаться на онлайн прием', MAKE_AN_APPOINTMENT)],
      [Markup.button.callback('Задать вопрос', ASK_QUESTION)]
    ]));
};

export { greeting };