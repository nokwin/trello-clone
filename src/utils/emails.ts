import { config } from "@/core/config";
import { mailTransport } from "@/core/nodemailer";

export const sendVerifyEmail = async (email: string, token: string) => {
  await mailTransport.sendMail({
    from: config.mail.from,
    to: email,
    subject: "Verify your email",
    html: `Please, verify your email <a href="${config.baseApiUri}/auth/verify-email/${token}">here</a>. <br /><br /> If rediret doesn't work, please copy this link to your browser: ${config.baseApiUri}/auth/verify-email/${token}`,
    text: `Please, verify your email here: ${config.baseApiUri}/auth/verify-email/${token}`,
  });
};
