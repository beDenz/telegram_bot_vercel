import { Telegraf, Markup } from 'telegraf';

import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production, initSpreadsheet } from './core';
import { ASK_QUESTION, MAKE_AN_APPOINTMENT } from './commands/common';
import { message, callbackQuery, channelPost } from "telegraf/filters"

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

initSpreadsheet();

bot.start(greeting());

bot.action(MAKE_AN_APPOINTMENT, async ctx => {
  ctx.reply('Текст для записи на прием');
})

bot.action(ASK_QUESTION, async ctx => {
  ctx.reply('Текст для вопроса');
})

bot.on(message("text"), ctx => {
	console.log('!!message', ctx.message.text);
});

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
