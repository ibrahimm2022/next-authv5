import Handlebars from "handlebars";
import nodemailer from "nodemailer";
export const sendMails = async ({ to, subject, body }) => {
  const { SMTP_EMAIL, SMTP_PASS } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // var transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 587,
  //   auth: {
  //     user: "08591365c6edc3",
  //     pass: "a2192a29986335",
  //   },
  //   tls: {
  //     ciphers: "SSLv3",

  //     rejectUnauthorized: false,
  //   },
  // });
  try {
    // const result = await transporter.verify();
    // console.log("hello", result);
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
};

export function compileTemplate(name, url, Template) {
  const tranferTemplate = Handlebars.compile(Template);

  const htmlBody = tranferTemplate({ name, url });
  return htmlBody;
}
