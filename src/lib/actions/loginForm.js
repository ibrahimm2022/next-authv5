"use server";

import { loginSchema } from "@/schema/loginschema";

export const login = async (values) => {
  let validateFields = false;
  console.log(values);
  await loginSchema
    .isValid(values)
    .then((res) => {
      validateFields = res;
    })
    .catch((errr) => (validateFields = errr));
  console.log(validateFields);

  if (validateFields) {
    return { success: "email sent" };
  }
};
