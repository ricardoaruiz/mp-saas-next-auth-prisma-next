import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
export function generateHash(text: string) {
  const salt = genSaltSync(10);
  return hashSync(text, salt);
}

export const compareHash = (text: string, hash: string) => {
  return compareSync(text, hash);
};