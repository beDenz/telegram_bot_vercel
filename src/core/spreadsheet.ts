import { GoogleSpreadsheet } from 'google-spreadsheet';

export const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

export const initSpreadsheet = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n')
  })
};