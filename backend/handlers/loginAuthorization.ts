import { Request, Response } from 'express';
import validator from 'validator';
import { authLogin } from '../controllers/authLogin';

export const loginAuthorization = (req: Request, res: Response) => {
  try {
    //validate parameters
    const email =  req.header('email');
    const password = req.header('password');

    //check if headers are empty, null or false
    if (!email || !password) {
      res.status(403).json({message: 'Invalid parameters'});
      return;
    }

    //check if headers contain special symbols
    if (
      validator.isEmail(email)
    ) {
      authLogin.loginAuthorization(req, res);
    } else {
      res.status(401).json({message: 'Invalid parameters'});
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};
