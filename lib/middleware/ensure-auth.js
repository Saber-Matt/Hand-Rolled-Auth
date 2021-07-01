
import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const { session } = req.cookies;
  //(token, 'SIGNATURE') 
  console.log(session);
  const payload = jwt.verify(session, process.env.APP_SECRET);
  req.user = payload;
  next();
}
