import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User } from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if(!cookies?.token) return res.status(401).json({message:'You are not authenicated!'})

  const refreshToken = cookies.token;

  const foundUser = await User.findOne( {refreshToken} ).exec();

  if(!foundUser) return res.status(403).json({message:'Not found user'})

  if(!foundUser) {
    jwt.verify(
      refreshToken, 
      process.env.REFRESH_TOKEN_SECRET, 
      (err, decoded) => {
      
      if(err || foundUser.username !== decoded.username) return res.status(400).json({data: err.message});
     
      const newAccessToken = generateAccessToken( user );
  
      res.status(200).json({
        "accessToken": newAccessToken
      })
    })
    return res.sendStatus(403); //Forbidden

  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if(err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = foundUser.save()
      }

      if(err || foundUser.email !== decoded.username) return res.sendStatus(403)

      const accessToken = generateAccessToken(decoded.username);

      const newRefreshToken = generateRefreshToken(foundUser.email)

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      res.cookie('token', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
      
      res.json({accessToken});
    }
  )

  
}

export {
  handleRefreshToken
}