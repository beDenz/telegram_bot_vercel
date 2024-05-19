import { Markup, Scenes } from 'telegraf';
import { CANCEL } from '../commands/common';
import { BotContext } from '../types/common';
import { createMessage } from './utils';
import { getCell } from '../core/table';

// https://github.com/telegraf/telegraf/issues/810
export const appointmentWizard = new Scenes.WizardScene<BotContext>(
  'appointment-wizard',
  async ctx => {
    const message = getCell('B3', ctx);
    await ctx.reply(
      message,
      Markup.inlineKeyboard([[Markup.button.callback('Отмена', CANCEL)]])
    );

		return ctx.wizard.next();
	},
	async ctx => {
    // @ts-ignore
    if (ctx.update.callback_query?.data === 'cancel') {
		  await ctx.reply('Действие отменено');
		  return await ctx.scene.leave();
    }

    const message = getCell('B4', ctx);
    // @ts-ignore
    const notifyMessage = createMessage('Запись на прием', ctx.update.message);
    ctx.telegram.sendMessage(process.env.NOTIFY_CHAT_ID!, notifyMessage);
		await ctx.reply(message);
		return await ctx.scene.leave();
  },
);