import { decode } from 'jsonwebtoken';

const getDecodedJWT = (token: string) => {
  const accessToken = token!.split(' ')[1];
  return decode(accessToken);
};

export default getDecodedJWT;
