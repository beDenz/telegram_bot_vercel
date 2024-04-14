export const createMessage = (type: string, ctx: any) => {
  const message = ctx.text;
  const firstName = ctx.from.first_name || '';
  const lastName = ctx.from.last_name || '';
  const user = firstName + ' ' + lastName;
  const username = '@' + ctx.from.username;
  const date = new Date(ctx.date);

  return `Сообщение от ${user} ${username}. От ${date}. Тип: ${type}. Текст сообщения: ${message}`
}