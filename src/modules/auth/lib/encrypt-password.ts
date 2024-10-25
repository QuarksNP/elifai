import argon2 from "argon2";

import crypto from "node:crypto";

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(32);

  try {
    const hash = await argon2.hash(password, {
      salt,
      secret: Buffer.from(process.env.ARGON2_SECRET as string, "base64"),
    });

    return hash;
  } catch {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async ({
  hashedPassword,
  password,
}: {
  hashedPassword: string;
  password: string;
}) => {
  try {
    const isValid = await argon2.verify(hashedPassword, password, {
      secret: Buffer.from(process.env.ARGON2_SECRET as string, "base64"),
    });

    return isValid;
  } catch(error) {
    console.log(error)
    throw new Error("Error comparing password");
  }
};
