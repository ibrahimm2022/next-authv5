"use server";

import * as bcrypt from "bcrypt";
import { activationTem } from "../emailtem/activation";
import { signJWT, verifyJWT } from "../jwt";
import { compileTemplate, sendMails } from "../mail";
import prisma from "../prisma";
export const register = async (user,origin) => {
  // console.log("start");
  // let validateFields = false;
  // await loginSchema
  //   .isValid(user)
  //   .then((res) => {
  //     validateFields = res;
  //   })
  //   .catch((errr) => (validateFields = errr));

  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hashSync(user.password, 10),
    },
  });
  const jwtUserId = signJWT({ id: newUser.id });
  const urlActivation = `${origin}/auth/actiavation/${jwtUserId}`;
  const body = await compileTemplate(
    user?.firstName,
    urlActivation,
    activationTem
  );
  await sendMails({
    to: newUser.email,
    subject: "activate email",
    body,
  });
  // await sendMails({
  //   to: "7ee52f9e79@emailabox.pro",
  //   subject: "html try from register",
  //   body: `<div style={{ background: "red" }}>fuck </div>`,
  // });

  // if (validateFields) {
  //   return { success: "email sent" };
  // }
  return newUser;
};

export const ActivateUserFun = async (jwtUserID) => {
  const payload = await verifyJWT(jwtUserID);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return "User Not Exist ";
  if (user.emailVerified) return "Emaail Already activatied";

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return "succes";
};
