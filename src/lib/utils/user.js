"use server";

export const findUser = async (userData) => {
  if (!userData) return;
  const user = await prisma.user.findUnique({
    where: { email: userData },
  });

  return user;
};
