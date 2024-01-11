import nodemailer from "nodemailer"
import { render } from '@react-email/render';
import VerificationEmail from "@/components/Emails/VerificationEmail";
import ResetPasswordEmail from "@/components/Emails/ResetPasswordEmail";


export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verificationLink = `${process.env.APP_URL}/auth/new-verification?token=${token}`

  const emailHtml = render(
    <VerificationEmail
      name={email}
      verificationLink={verificationLink}
    />
  );

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    }
  })

  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verification Email",
    html: emailHtml
  }

  return transport.sendMail(options);
}

export const sendResetPasswordEmail = async (
  email: string,
  token: string
) => {
  const restLink = `${process.env.APP_URL}/auth/new-password?token=${token}`

  const emailHtml = render(
    <ResetPasswordEmail
      name={email}
      verificationLink={restLink}
    />
  );

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    }
  })

  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: emailHtml
  }

  return transport.sendMail(options);
}