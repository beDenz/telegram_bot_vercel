import { Markup, Scenes } from 'telegraf';
import { CANCEL } from '../commands/common';
import { doc } from '../core';
import { BotContext } from '../types/common';
import { createMessage } from './utils';

export const questionWizard = new Scenes.WizardScene<BotContext>(
  'question-wizard',
  async ctx => {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells(['B5']);
    const message = sheet.getCellByA1('B5').value.toString();

    await ctx.reply(
      message,
      Markup.inlineKeyboard([[Markup.button.callback('Отмена', CANCEL)]]));
		return ctx.wizard.next();
	},
	async ctx => {
    // @ts-ignore
    if (ctx.update.callback_query?.data === 'cancel') {
		  await ctx.reply('Действие отменено');
		  return await ctx.scene.leave();
    }

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells(['B6']);
    const message = sheet.getCellByA1('B6').value.toString();
    // @ts-ignore
    const notifyMessage = createMessage('Вопрос', ctx.update.message);
    ctx.telegram.sendMessage(process.env.NOTIFY_CHAT_ID!, notifyMessage);
		await ctx.reply(message);
		return await ctx.scene.leave();
  },
);
