export const config = {
  baseApiUri: process.env.NEXT_PUBLIC_API_URI,
  isProduction: process.env.NODE_ENV === "production",
  resend: {
    apiKey: process.env.RESEND_KEY,
  },
  mail: {
    host: process.env.MAIL_HOST,
    smtp: Number(process.env.MAIL_SMTP),
    from: process.env.MAIL_FROM,
  },
};
