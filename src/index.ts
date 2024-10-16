import { Telegraf, Composer, Markup, Scenes, session, Context } from 'telegraf';
import { greeting } from './text';
import { development, production, initSpreadsheet } from './core';
import { ASK_QUESTION, MAKE_AN_APPOINTMENT } from './commands/common';
import { appointmentWizard } from './wizard/appointment';
import { questionWizard } from './wizard/question';
import { BotContext } from './types/common';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf<BotContext>(BOT_TOKEN);
const stage = new Scenes.Stage<BotContext>([appointmentWizard, questionWizard]);
bot.use(session());
bot.use(stage.middleware());

initSpreadsheet();

bot.start(greeting());

bot.action(MAKE_AN_APPOINTMENT, async ctx => {
  ctx.scene.enter('appointment-wizard');
})
bot.action(ASK_QUESTION, async ctx => {
  ctx.scene.enter('question-wizard');
})

console.log('!!!!start', process.env);

if (ENVIRONMENT !== 'production') {
  development(bot);
} else {
  production(bot);
}