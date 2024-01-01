import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;

const generateAccessToken = ( user ) => {
  return jwt.sign( { "username": user }, process.env.ACCESSS_TOKEN_SECRET, { expiresIn: "10s" });
}

const generateRefreshToken = (user) => {
  return jwt.sign( { "username": user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

export {
  generateAccessToken,
  generateRefreshToken
}