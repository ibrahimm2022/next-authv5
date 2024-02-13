"use server";
import * as bcrypt from "bcrypt";

import { resetTem } from "../emailtem/activation";
import { signJWT, verifyJWT } from "../jwt";
import { compileTemplate, sendMails } from "../mail";
import prisma from "../prisma";

export const forgotPass = async ({ email }, origin) => {
  const { SMTP_EMAIL } = process.env;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("The User Does Not Exist!");

  const jwtUserID = signJWT({
    id: user.id,
  });

  const verify = verifyJWT(jwtUserID);

  if (verify.id !== user.id) throw new Error("Denied Access");

  const body = await compileTemplate(
    user.firstName,
    `${origin}/auth/resertpass/${jwtUserID}`,
    resetTem
  );

  sendMails({ from: SMTP_EMAIL, to: email, subject: "Reset Password", body });
};

export const resetPass = async (values, token) => {
  try {
    const bcPass = await bcrypt.hash(values.password, 10);
    const checkAccess = await verifyJWT(token);

    const user = await prisma.user.findUnique({
      where: {
        id: checkAccess.id,
      },
    });
    if (!user) return;
    const result = await prisma.user.update({
      where: {
        id: checkAccess.id,
      },
      data: {
        password: bcPass,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Denied Access");
  }
};
