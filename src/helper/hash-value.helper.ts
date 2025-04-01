import bcrypt from 'bcrypt';

export const hashValue = async (value: string, round: number = 10) => {
  const salt = await bcrypt.genSalt(round);
  return bcrypt.hash(value, salt);
};

export const compareHashedValue = async (
  value: string,
  hashedValue: string
) => {
  return bcrypt.compare(value, hashedValue);
};
