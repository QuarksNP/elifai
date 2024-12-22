import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error('Error hashing password');
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
    const isValid = await bcrypt.compare(password, hashedPassword);

    return isValid;
  } catch (error) {
    console.log(error);
    throw new Error('Error comparing password');
  }
};
