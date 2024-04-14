import { Scenes, Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface MySession extends Scenes.WizardSession {
	mySessionProp: number;
}

export interface BotContext extends Context<Update> {
	myContextProp: string;
	session: MySession;
	scene: Scenes.SceneContextScene<BotContext, Scenes.WizardSessionData>;
	wizard: Scenes.WizardContextWizard<BotContext>;
}