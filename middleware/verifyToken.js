import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers.Authorization || req.headers.authorization
  if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify( 
      token, 
      process.env.ACCESSS_TOKEN_SECRET, 
      (err, decoded) => {
          if(err) return res.status(403).send({status: "fail", data:err.message});
          req.user = decoded.username
          next()
  })
}

export {
  verifyToken
}